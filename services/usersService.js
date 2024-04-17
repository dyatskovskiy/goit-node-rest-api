import { HttpError } from "../helpers/HttpError.js";

import User from "../models/user.js";

import { signToken } from "./jwtService.js";

import { hashPassword, validatePassword } from "./passwordService.js";

export const getUserByIdService = async (id) => {
  const user = await User.findById(id);

  return user;
};

export const getUserByEmailService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const signUpUserService = async (data) => {
  const hash = await hashPassword(data);

  const newUser = await User.create({ ...data, password: hash });

  const userObject = newUser.toObject();

  userObject.password = undefined;
  userObject.token = undefined;
  userObject._id = undefined;

  return userObject;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isPasswordValid = await validatePassword(password, user.password);

  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = signToken(user.id);

  user.token = token;

  await user.save();

  const userObject = user.toObject();
  userObject.password = undefined;
  userObject._id = undefined;
  userObject.token = undefined;

  return { userObject, token };
};
