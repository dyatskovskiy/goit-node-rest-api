import { HttpError } from "../helpers/HttpError.js";

export const signUpUserValidator = (schema) => {
  const fn = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw HttpError(400, "Please provide all required fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "Invalid credentials provided");
    }
    next();
  };
  return fn;
};
