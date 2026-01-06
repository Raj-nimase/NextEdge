import { verifyAccessToken } from "./jwt.utils.js";
import Admin from "./admin.model.js";

/**
 * Middleware to verify JWT token and authenticate admin
 * Protects routes from unauthorized access
 */
export const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token format.",
      });
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Check if admin exists and is active
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is deactivated.",
      });
    }

    // Attach admin info to request object
    req.admin = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);

    if (error.message === "Token has expired") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    if (error.message === "Invalid token") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Access denied.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};

/**
 * Middleware to check if user has admin role
 * Should be used after authenticateAdmin middleware
 */
export const requireAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
  next();
};
