import Joi from "joi";

export const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const verificationResendingEmailSchema = Joi.object({
  email: Joi.string().email(),
});
