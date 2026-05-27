import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { generateToken, JwtPayload } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const token = generateToken({
      id: user.get("id") as number,
      email: user.get("email") as string,
    });

    return res.status(201).json({ token, user });
  } catch (e) {
    return res.status(500).json({
      message: "Register error",
      e,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.get("password") as string,
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: user.get("id") as number,
      email: user.get("email") as string,
    });

    return res.json({
      token,
      user,
    });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
