import { Request, Response } from "express";
import { UserInterface, User } from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({ raw: true });

  if (users.length === 0) {
    return res.status(404).json("users not found");
  }
  return res.json(users);
};

export const whoMe = async (req: Request, res: Response) => {
  return res.json({
    user: req.user,
  });
};
