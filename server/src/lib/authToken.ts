import jwt from "jsonwebtoken";
import "dotenv/config";

function getSecret(name: string): string {
    const secret = process.env[name];

    if (!secret) {
        throw new Error(`${name} is not configured`);
    }

    return secret;
}

export function GenerateAccessToken(payload: object): string {
    return jwt.sign(payload, getSecret("ACCESS_TOKEN_SECRET"), {
        expiresIn: "1h",
    });
}

export function GenerateRefreshToken(payload: object): string {
    return jwt.sign(payload, getSecret("REFRESH_TOKEN_SECRET"), {
        expiresIn: "7d",
    });
}

export function VerifyRefreshToken(token: string) {
    return jwt.verify(token, getSecret("REFRESH_TOKEN_SECRET"));
}

export function VerifyAccessToken(token: string) {
    return jwt.verify(token, getSecret("ACCESS_TOKEN_SECRET"));
}