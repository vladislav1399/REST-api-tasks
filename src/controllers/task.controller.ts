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

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, description, completed } = req.body;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.update({
      title,
      description,
      completed,
    });

    return res.json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.destroy();

    return res.json({
      message: "Task deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
};
