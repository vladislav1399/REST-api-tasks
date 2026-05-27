import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks", "postgres", "Aa90397850", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
