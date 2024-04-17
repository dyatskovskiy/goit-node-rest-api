import User from "../models/user.js";
import { hashPassword } from "./passwordService.js";

export const findUserByEmail = async (email) => {
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
