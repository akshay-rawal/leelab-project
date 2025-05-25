import { body } from "express-validator";

const userregisterValidator = () => [
  
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 to 20 characters"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const userLoginValidator = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const resetPasswordValidator = () => [
  body("password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const projectValidator = () => [
  body("name")
      .notEmpty()
      .withMessage("Project name is required.")
      .isLength({ min: 6 })
      .withMessage("Project name must be at least 6 characters long."),
];

export { userLoginValidator, userregisterValidator,resetPasswordValidator,projectValidator};
