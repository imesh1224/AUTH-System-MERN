import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", protect, getProfile);

export default userRouter;
