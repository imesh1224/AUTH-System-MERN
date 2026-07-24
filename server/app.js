import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
