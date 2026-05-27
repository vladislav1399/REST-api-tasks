import express from "express";
import { sequelize } from "./config/db";

import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";

const app = express();

async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync();
    console.log("DB synced");
  } catch (e) {
    console.error("DB error:", e);
  }
}

start();

app.use(express.json());

app.use("/users", userRoute);
app.use("/auth", authRoute);
export default app;
