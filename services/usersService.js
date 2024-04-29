import { HttpError } from "../helpers/HttpError.js";

import User from "../models/user.js";

import { signToken } from "./jwtService.js";

import { hashPassword, validatePassword } from "./passwordService.js";
import { ImageService } from "./imageService.js";
import { v4 } from "uuid";
import { EmailService } from "./emailService.js";

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
  const verificationToken = v4();
  const newUser = await User.create({
    ...data,
    password: hash,
    verificationToken,
  });

  const transporter = EmailService.createTransporter();

  const emailConfig = EmailService.configureEmail(
    data.email,
    "Verification",
    `<h2>Click the link below to verify your account</h2>
    <a href='http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}'>Verify</a>`
  );

  await EmailService.sendEmail(transporter, emailConfig);

  const userObject = newUser.toObject();

  userObject.password = undefined;
  userObject.token = undefined;
  userObject._id = undefined;
  userObject.avatarURL = undefined;
  userObject.verificationToken = undefined;
  userObject.verify = undefined;

  return userObject;
};

export const verificationUserService = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true }
  );
};

export const verificationResendingEmailService = async (data) => {
  const user = await getUserByEmailService(data.email);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const { verificationToken } = user;

  const transporter = EmailService.createTransporter();

  const emailConfig = EmailService.configureEmail(
    data.email,
    "Verification",
    `<h2>Click the link below to verify your account</h2>
    <a href='http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}'>Verify</a>`
  );

  await EmailService.sendEmail(transporter, emailConfig).catch((err) => {
    console.log(err);
    throw HttpError(err.responseCode, err.response);
  });
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

  if (!user.verify) throw HttpError(403, "User not verified");

  const token = signToken(user.id);

  await User.findByIdAndUpdate(user.id, { token });

  const userObject = user.toObject();
  userObject.password = undefined;
  userObject._id = undefined;
  userObject.token = undefined;
  userObject.avatarURL = undefined;
  userObject.verificationToken = undefined;
  userObject.verify = undefined;

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
  userObject.verificationToken = undefined;
  userObject.verify = undefined;

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
