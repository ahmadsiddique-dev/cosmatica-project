import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

import { db } from "../lib/db.ts";
import UserTable from "../schemas/user.schema.ts";
import { loginSchema, signupSchema } from "../schemas/auth.schema.ts";

import {
    GenerateAccessToken,
    GenerateRefreshToken,
    VerifyRefreshToken,
} from "../lib/authToken.ts";

import {
    hashPassword,
    isPasswordCorrect,
} from "../lib/hashPassword.ts";

const REFRESH_COOKIE = "refreshToken";

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
};

const clearRefreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

const publicUserColumns = {
    id: UserTable.id,
    userName: UserTable.userName,
    fullName: UserTable.fullName,
    email: UserTable.email,
};

function validationError(res: Response, issues: { message: string }[]) {
    return res.status(400).json({
        message: issues[0]?.message ?? "Invalid input",
    });
}

export const SignupController = async (
    req: Request,
    res: Response
) => {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return validationError(res, parsed.error.issues);
        }

        const {
            userName,
            fullName,
            email,
            password,
        } = parsed.data;

        const [existingEmail] = await db
            .select({
                id: UserTable.id,
            })
            .from(UserTable)
            .where(eq(UserTable.email, email));

        if (existingEmail) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        const [existingUserName] = await db
            .select({
                id: UserTable.id,
            })
            .from(UserTable)
            .where(eq(UserTable.userName, userName));

        if (existingUserName) {
            return res.status(409).json({
                message: "This username is already taken",
            });
        }

        const hashedPassword = await hashPassword(password);

        const [user] = await db
            .insert(UserTable)
            .values({
                userName,
                fullName,
                email,
                password: hashedPassword,
            })
            .returning(publicUserColumns);

        const accessToken = GenerateAccessToken({
            userId: user.id,
            userName: user.userName,
            email: user.email,
        });

        const refreshToken = GenerateRefreshToken({
            userId: user.id,
        });

        await db
            .update(UserTable)
            .set({
                refreshToken,
            })
            .where(eq(UserTable.id, user.id));

        res.cookie(
            REFRESH_COOKIE,
            refreshToken,
            refreshCookieOptions
        );

        return res.status(201).json({
            message: "Signup successful",
            user,
            accessToken,
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


export const LoginController = async (
    req: Request,
    res: Response
) => {
    try {
        const parsed = loginSchema.safeParse(req.body);

        if (!parsed.success) {
            return validationError(res, parsed.error.issues);
        }

        const { email, password } = parsed.data;

        const [user] = await db
            .select({
                id: UserTable.id,
                userName: UserTable.userName,
                fullName: UserTable.fullName,
                email: UserTable.email,
                password: UserTable.password,
            })
            .from(UserTable)
            .where(eq(UserTable.email, email));

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const passwordCorrect = await isPasswordCorrect(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const accessToken = GenerateAccessToken({
            userId: user.id,
            userName: user.userName,
            email: user.email,
        });

        const refreshToken = GenerateRefreshToken({
            userId: user.id,
        });

        await db
            .update(UserTable)
            .set({
                refreshToken,
            })
            .where(eq(UserTable.id, user.id));

        res.cookie(
            REFRESH_COOKIE,
            refreshToken,
            refreshCookieOptions
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
            },
            accessToken,
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


export const RefreshController = async (
    req: Request,
    res: Response
) => {
    const refreshToken = req.cookies?.[REFRESH_COOKIE];

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found",
        });
    }

    try {
        const decoded = VerifyRefreshToken(refreshToken) as {
            userId?: number | string;
        };

        const userId = Number(decoded.userId);

        if (!Number.isInteger(userId)) {
            throw new Error("Invalid refresh token payload");
        }

        const [user] = await db
            .select({
                ...publicUserColumns,
                refreshToken: UserTable.refreshToken,
            })
            .from(UserTable)
            .where(eq(UserTable.id, userId));

        if (!user || user.refreshToken !== refreshToken) {
            res.clearCookie(REFRESH_COOKIE, clearRefreshCookieOptions);

            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }

        const accessToken = GenerateAccessToken({
            userId: user.id,
            userName: user.userName,
            email: user.email,
        });

        return res.status(200).json({
            accessToken,
            user: {
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
            },
        });

    } catch (error) {
        res.clearCookie(REFRESH_COOKIE, clearRefreshCookieOptions);

        return res.status(401).json({
            message: "Invalid or expired refresh token",
        });
    }
};


/**
 * Returns the currently authenticated user.
 * Protected by RequireAuth, so `req.user` is always set here.
 */
export const MeController = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user!.userId;

        const [user] = await db
            .select(publicUserColumns)
            .from(UserTable)
            .where(eq(UserTable.id, userId));

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            user,
        });

    } catch (error) {
        console.error("Me error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


export const LogoutController = async (
    req: Request,
    res: Response
) => {
    try {
        const refreshToken = req.cookies?.[REFRESH_COOKIE];

        if (refreshToken) {
            await db
                .update(UserTable)
                .set({
                    refreshToken: null,
                })
                .where(eq(UserTable.refreshToken, refreshToken));
        }

        res.clearCookie(REFRESH_COOKIE, clearRefreshCookieOptions);

        return res.status(200).json({
            message: "Logout successful",
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
