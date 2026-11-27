import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

import { db } from "../lib/db.ts";
import UserTable from "../schemas/user.schema.ts";

import {
    GenerateAccessToken,
    GenerateRefreshToken,
    VerifyRefreshToken,
} from "../lib/authToken.ts";

import {
    hashPassword,
    isPasswordCorrect,
} from "../lib/hashPassword.ts";


const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 1000 * 60 * 60 * 24 * 7,
};


export const SignupController = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            userName,
            fullName,
            email,
            password,
        } = req.body;

        if (!userName || !fullName || !email || !password) {
            return res.status(400).json({
                message: "userName, fullName, email and password are required",
            });
        }

        const [existingUser] = await db
            .select({
                id: UserTable.id,
            })
            .from(UserTable)
            .where(eq(UserTable.email, email));

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
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
            .returning({
                id: UserTable.id,
                userName: UserTable.userName,
                email: UserTable.email,
            });

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
            "refreshToken",
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

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
            "refreshToken",
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
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token not found",
            });
        }

        const decoded = VerifyRefreshToken(refreshToken) as {
            userId: string;
        };

        const [user] = await db
            .select({
                id: UserTable.id,
                userName: UserTable.userName,
                email: UserTable.email,
                refreshToken: UserTable.refreshToken,
            })
            .from(UserTable)
            .where(eq(UserTable.id, Number(decoded.userId)));

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }

        const newAccessToken = GenerateAccessToken({
            userId: user.id,
            userName: user.userName,
            email: user.email,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token",
        });
    }
};


export const LogoutController = async (
    req: Request,
    res: Response
) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await db
                .update(UserTable)
                .set({
                    refreshToken: "",
                })
                .where(eq(UserTable.refreshToken, refreshToken));
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

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