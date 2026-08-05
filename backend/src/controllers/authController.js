import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret";
const COOKIE_NAME = "thinkboard_token";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function toUserPayload(user) {
  return {
    _id: user._id,
    username: user.username,
    createdAt: user.createdAt,
  };
}

function setAuthCookie(res, userId) {
  const token = createToken(userId);
  res.cookie(COOKIE_NAME, token, cookieOptions);
}

export async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username.trim(),
      password: hashedPassword,
    });

    setAuthCookie(res, user._id);

    return res.status(201).json({ user: toUserPayload(user) });
  } catch (error) {
    console.log("Error in register controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    setAuthCookie(res, user._id);

    return res.status(200).json({ user: toUserPayload(user) });
  } catch (error) {
    console.log("Error in login controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie(COOKIE_NAME, {
      ...cookieOptions,
      maxAge: undefined,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function me(req, res) {
  try {
    return res.status(200).json({ user: toUserPayload(req.user) });
  } catch (error) {
    console.log("Error in me controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}