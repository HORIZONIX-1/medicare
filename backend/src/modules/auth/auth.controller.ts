import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import prisma from "../../config/prisma";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Your account has been deactivated. Please contact an administrator." });
    }

    const token = generateToken(user);

    const safeUser = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json({ token, user: safeUser });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({ message: "Server error" });
  }
};
