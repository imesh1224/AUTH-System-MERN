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
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  emailValidation,
  loginValidation,
  validate,
  resetPasswordValidation,
} from "../middlewares/authValidation.middleware.js";

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

export default authRoute;
