import { body } from "express-validator";

const userregisterValidator = () => [
  
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
     .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("name must contain only letters and numbers")
    .isLength({ min: 3, max: 20 })
    .withMessage("name must be between 3 to 20 characters"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
   // In userregisterValidator
.isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

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
