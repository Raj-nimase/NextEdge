// Deprecated: use helpers from "../utils/jwt.js" instead.
// This file re-exports the shared utilities to avoid breaking imports.
export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokens,
} from "../utils/jwt.js";
