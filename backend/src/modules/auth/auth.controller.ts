import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

const prisma = new PrismaClient();

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

    const message = error instanceof Error ? error.message : "Server error";

    return res.status(500).json({ message });
  }
};
