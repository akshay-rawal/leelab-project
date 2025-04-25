import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Password functions
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const isPasswordCorrect = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// JWT tokens
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Temporary token (e.g. for password reset)
export const generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes
  return { unHashedToken, hashToken, tokenExpiry };
};


export {generateAccessToken,generateRefreshToken,generateTemporaryToken,isPasswordCorrect,hashPassword}