import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export async function isPasswordCorrect(
    password: string,
    hashedPassword: string
) {
    return bcrypt.compare(password, hashedPassword);
}