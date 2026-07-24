import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import helmet from "helmet";
import cors from "cors";
import ratelimiter from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://localhost:5173",
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const limiter = ratelimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use("/api/", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
