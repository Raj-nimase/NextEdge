import Member from "./member.model.js";
import {
  generateTokens,
  verifyRefreshToken,
  generateAccessToken,
} from "../utils/jwt.js";

const MEMBER_REFRESH_COOKIE = "memberRefreshToken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const member = await Member.findOne({ email: email.toLowerCase() }).select("+password");
    if (!member) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    if (!member.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    const valid = await member.comparePassword(password);
    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: member._id,
      email: member.email,
      role: member.role,
    };
    const { accessToken, refreshToken } = generateTokens(payload);

    res.cookie(MEMBER_REFRESH_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      member: member.toSafeObject(),
    });
  } catch (error) {
    console.error("Member login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies[MEMBER_REFRESH_COOKIE];
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (decoded.role !== "member") {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const member = await Member.findById(decoded.id);
    if (!member || !member.isActive) {
      return res.status(403).json({
        success: false,
        message: "Member not found or inactive",
      });
    }

    const payload = {
      id: member._id,
      email: member.email,
      role: member.role,
    };
    const accessToken = generateAccessToken(payload);

    res.status(200).json({
      success: true,
      accessToken,
      member: member.toSafeObject(),
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Invalid refresh token",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie(MEMBER_REFRESH_COOKIE, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: process.env.COOKIE_SAMESITE || "lax",
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

export const verifyMember = async (req, res) => {
  try {
    const member = await Member.findById(req.member.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    res.status(200).json({
      success: true,
      member: member.toSafeObject(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET /api/members (Admin only) - List all members
 */
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 }).lean();
    const list = members.map((m) => ({
      _id: m._id,
      email: m.email,
      role: m.role,
      isActive: m.isActive,
      createdAt: m.createdAt,
    }));
    res.json({ success: true, members: list });
  } catch (error) {
    console.error("Get members error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to load members",
    });
  }
};

/**
 * POST /api/members (Admin only) - Create a new member account
 * Body: { email, password }
 */
export const createMember = async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password || String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password is required and must be at least 6 characters",
      });
    }

    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A member with this email already exists",
      });
    }

    const member = await Member.create({ email, password });
    res.status(201).json({
      success: true,
      message: "Member account created. Share the login details with them.",
      member: member.toSafeObject(),
    });
  } catch (error) {
    console.error("Create member error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create member",
    });
  }
};
