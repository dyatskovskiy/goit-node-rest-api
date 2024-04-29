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

export const verificationResendingEmailValidator = (schema) => {
  const fn = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      throw HttpError(400, "Missing required field email");
    }

    const { error } = schema.validate(req.body);

    if (error) throw HttpError(400, "Email is uncorrect");

    next();
  };

  return fn;
};
