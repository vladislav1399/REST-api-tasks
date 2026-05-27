import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

export interface UserInterface {
  id: number;
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
}

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
