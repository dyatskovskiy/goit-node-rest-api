import { HttpError } from "../helpers/HttpError.js";

export const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
  return fn;
};
