import jwt from "jsonwebtoken";

/**
 * Generate JWT access token
 * @param {Object} payload - Data to encode in token
 * @returns {String} JWT token
 */
export const generateAccessToken = (payload) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  });
};

/**
 * Generate JWT refresh token
 * @param {Object} payload - Data to encode in token
 * @returns {String} JWT token
 */
export const generateRefreshToken = (payload) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  });
};

/**
 * Verify JWT access token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded payload
 */
export const verifyAccessToken = (token) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    throw error;
  }
};

/**
 * Verify JWT refresh token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded payload
 */
export const verifyRefreshToken = (token) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }

  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Refresh token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid refresh token");
    }
    throw error;
  }
};

/**
 * Generate both access and refresh tokens
 * @param {Object} payload - Data to encode in tokens
 * @returns {Object} Object containing both tokens
 */
export const generateTokens = (payload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

