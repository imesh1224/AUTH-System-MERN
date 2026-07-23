import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Valid email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value) => {
      if (value.trim().length === 0) {
        throw new Error("Password cannot consist of only spaces");
      }
      return true;
    }),
];

export const emailValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Valid email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Valid email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value) => {
      if (value.trim().length === 0) {
        throw new Error("Password cannot consist of only spaces");
      }
      return true;
    }),
];
