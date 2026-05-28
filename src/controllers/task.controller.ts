import { Request, Response } from "express";
import { Task } from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      completed: false,

      // user из JWT middleware
      userId: req.user!.id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to create task",
      e,
    });
  }
};

export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.user!.id,
      },
    });

    return res.json(tasks);
  } catch (e) {
    return res.status(500).json({
      message: "Failed to fetch tasks",
      e,
    });
  }
};
