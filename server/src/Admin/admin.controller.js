import Admin from "./admin.model.js";
import {
  generateTokens,
  verifyRefreshToken,
  generateAccessToken,
} from "./jwt.utils.js";

/**
 * Admin Login
 * @route POST /api/admin/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find admin with password field
    const admin = await Admin.findOne({ username }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is deactivated",
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate tokens
    const payload = {
      id: admin._id,
      username: admin.username,
      role: admin.role,
    };

    const { accessToken, refreshToken } = generateTokens(payload);

    // Set HTTP-only cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return access token and admin data
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      admin: admin.toSafeObject(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

/**
 * Refresh Access Token
 * @route POST /api/admin/refresh
 * @access Public (requires refresh token in cookie)
 */
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find admin to ensure still exists and active
    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin not found or inactive",
      });
    }

    // Generate new access token
    const payload = {
      id: admin._id,
      username: admin.username,
      role: admin.role,
    };

    const accessToken = generateAccessToken(payload);

    res.status(200).json({
      success: true,
      accessToken,
      admin: admin.toSafeObject(),
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({
      success: false,
      message: error.message || "Invalid refresh token",
    });
  }
};

/**
 * Logout
 * @route POST /api/admin/logout
 * @access Private (Admin only)
 */
export const logout = async (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

/**
 * Verify Admin Token
 * @route GET /api/admin/verify
 * @access Private (Admin only)
 */
export const verifyAdmin = async (req, res) => {
  try {
    // req.admin is set by the auth middleware
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin: admin.toSafeObject(),
    });
  } catch (error) {
    console.error("Verify admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

/**
 * Get Current Admin Profile
 * @route GET /api/admin/profile
 * @access Private (Admin only)
 */
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin: admin.toSafeObject(),
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
