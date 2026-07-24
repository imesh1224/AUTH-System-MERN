export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (process.env.NODE_ENV === "development") {
    console.log("Error:", error);
  }

  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const duplicateKeys = err.keyValue || err.keyPattern || {};
    const filed = Object.keys(duplicateKeys)[0] || "Field";
    const formattedField = field.charAt(0).toUpperCase() + field.slice(1);

    const message = `${formattedField} already exists`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ErrorResponse(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  const error = new ErrorResponse(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};
