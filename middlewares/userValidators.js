import { HttpError } from "../helpers/HttpError.js";

export const userDataValidator = (schema) => {
  const fn = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      throw HttpError(400, "Please provide all required fields");

    const { error } = schema.validate(req.body);

    if (error) throw HttpError(400, "Invalid credentials provided");

    next();
  };
  return fn;
};

export const updateSubscriptionValidator = (schema) => {
  const fn = (req, res, next) => {
    const { subscription } = req.body;

    if (!subscription)
      throw HttpError(400, "Please provide all required fields");

    const { error } = schema.validate(req.body);

    if (error)
      throw HttpError(
        400,
        "Invalid type of subscription. Choose one of 'starter', 'pro' or 'business'"
      );

    next();
  };

  return fn;
};
