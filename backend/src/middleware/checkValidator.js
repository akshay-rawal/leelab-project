
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log("error hai yeh:", errors);

  if (errors.isEmpty()) {
    return next();
  }
  const extractArray = [];
  errors.array().map((err) =>
    extractArray.push({
      [err.path]: err.msg,
    })
  );

  return res.status(422).json({
    success: false,
    message: "Received data is not valid",
    errors: extractArray,
  });
};
