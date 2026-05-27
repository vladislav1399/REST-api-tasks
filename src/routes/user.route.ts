import { Router } from "express";
import { getUsers, whoMe } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getUsers);
router.get("/whome", authMiddleware, whoMe);

export default router;
