import { body } from "express-validator";

const problemCreateValidator = () => [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long."),

  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters long."),

  body("difficulty")
    .notEmpty()
    .withMessage("Difficulty is required.")
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Difficulty must be one of: Easy, Medium, Hard."),

  body("testCases")
    .isArray({ min: 1 })
    .withMessage("At least one test case is required."),
  
  body("testCases.*.input")
    .notEmpty()
    .withMessage("Each test case must have an input."),

  body("testCases.*.output")
    .notEmpty()
    .withMessage("Each test case must have an output."),
];

export { problemCreateValidator };
