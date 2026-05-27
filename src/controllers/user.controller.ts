import { Request, Response } from "express";
import { UserInterface, User } from "../models/user.model";

export const createUser = (req: Request, res: Response) => {
  res.json("user has been created");
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  if (users.length === 0) {
    return res.status(404).json("users not found");
  }
  return res.json(users);
};
