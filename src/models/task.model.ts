import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
