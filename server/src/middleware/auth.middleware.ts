import type { NextFunction, Request, Response } from "express";

import { VerifyAccessToken } from "../lib/authToken.ts";

export interface AccessTokenPayload {
    userId: number;
    userName: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload;
        }
    }
}

/**
 * Protects a route by requiring a valid `Authorization: Bearer <accessToken>`
 * header. On success it attaches the decoded user to `req.user`.
 *
 * Usage:
 *   router.get("/me", RequireAuth, MeController);
 */
export function RequireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    const token = authorization.slice("Bearer ".length).trim();

    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    try {
        const decoded = VerifyAccessToken(token) as Partial<AccessTokenPayload>;

        if (
            typeof decoded.userId !== "number" ||
            typeof decoded.userName !== "string" ||
            typeof decoded.email !== "string"
        ) {
            return res.status(401).json({
                message: "Invalid access token",
            });
        }

        req.user = {
            userId: decoded.userId,
            userName: decoded.userName,
            email: decoded.email,
        };

        return next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
}
