import { HttpError } from "../helpers/HttpError.js";

import User from "../models/user.js";

import { signToken } from "./jwtService.js";

import { hashPassword, validatePassword } from "./passwordService.js";
import { ImageService } from "./imageService.js";

export const findUserService = async (id, token) => {
  const user = await User.findById(id);

  if (!user) throw HttpError(401);

  if (token !== user.token) throw HttpError(401);

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
  userObject.avatarURL = undefined;

  return userObject;
};

export const logInUserService = async ({ email, password }) => {
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
  userObject.avatarURL = undefined;

  return { userObject, token };
};

export const logOutUserService = async (user) => {
  if (!user.token) throw HttpError(401);

  await User.findByIdAndUpdate(user.id, { token: null }, { new: true });
};

export const updateSubscriptionService = async (user, subscriptionType) => {
  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      subscription: subscriptionType,
    },
    { new: true }
  );

  const userObject = updatedUser.toObject();
  userObject._id = undefined;
  userObject.password = undefined;
  userObject.token = undefined;
  userObject.avatarURL = undefined;

  return userObject;
};

export const updateAvatarService = async (user, file) => {
  if (!file) throw HttpError(400, "Please upload the image");

  const avatarURL = await ImageService.saveImage(user);

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { avatarURL },
    { new: true }
  );

  return updatedUser;
};
