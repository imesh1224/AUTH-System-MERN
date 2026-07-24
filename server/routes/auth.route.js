import express from "express";
import {
  register,
  verifyEmail,
  resendVerification,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  emailValidation,
  loginValidation,
  resetPasswordValidation,
} from "../middlewares/authValidation.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import protect from "../middlewares/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/register", registerValidation, validate, register);
authRoute.get("/verify-email/:token", verifyEmail);
authRoute.post(
  "/resend-verification",
  emailValidation,
  validate,
  resendVerification,
);
authRoute.post("/login", loginValidation, validate, login);
authRoute.post("/logout", logout);
authRoute.post("/refresh-token", refreshToken);
authRoute.post("/forgot-password", emailValidation, validate, forgotPassword);
authRoute.post(
  "/reset-password/:token",
  resetPasswordValidation,
  validate,
  resetPassword,
);

authRoute.get("/me", protect, getMe);

export default authRoute;
