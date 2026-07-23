import express from "express";
import {
  register,
  verifyEmail,
  resendVerification,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  emailValidation,
  loginValidation,
} from "../middlewares/authValidation.middleware.js";

const authRoute = express.Router();

authRoute.post("/register", registerValidation, register);
authRoute.get("/verify-email/:token", verifyEmail);
authRoute.post("/resend-verification", emailValidation, resendVerification);
authRoute.post("/login", loginValidation, login);
authRoute.get("/logout", logout);
authRoute.post("/refresh-token", refreshToken);

export default authRoute;
