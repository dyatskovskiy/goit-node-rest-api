import Joi from "joi";

export const signUpUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});
