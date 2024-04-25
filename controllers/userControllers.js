import { catchAsync } from "../helpers/catchAsync.js";

import {
  logInUserService,
  logOutUserService,
  signUpUserService,
  updateAvatarService,
  updateSubscriptionService,
} from "../services/usersService.js";

export const signUpUserController = catchAsync(async (req, res) => {
  const newUser = await signUpUserService(req.body);

  res.status(201).json({ user: newUser });
});

export const logInUserController = catchAsync(async (req, res) => {
  const user = await logInUserService(req.body);

  res.status(200).json({ token: user.token, user: user.userObject });
});

export const logOutUserController = catchAsync(async (req, res) => {
  await logOutUserService(req.user);

  res.sendStatus(204);
});

export const getCurrentUserController = (req, res) => {
  const user = req.user.toObject();

  user.password = undefined;
  user.token = undefined;
  user._id = undefined;

  res.status(200).json(user);
};

export const updateSubscriptionController = catchAsync(async (req, res) => {
  const updatedUser = await updateSubscriptionService(
    req.user,
    req.body.subscription
  );

  res.status(200).json(updatedUser);
});

export const updateAvatarController = catchAsync(async (req, res) => {
  const updatedUser = await updateAvatarService(req.user, req.file);

  res.status(200).json({ avatarUrl: updatedUser.avatarURL });
});
