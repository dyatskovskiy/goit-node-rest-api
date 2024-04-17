import { catchAsync } from "../helpers/catchAsync.js";

import {
  logInUserService,
  logOutUserService,
  signUpUserService,
} from "../services/usersService.js";

export const signUpUserController = catchAsync(async (req, res) => {
  const newUser = await signUpUserService(req.body);

  res.status(201).json({ user: newUser });
});

export const logInUserController = catchAsync(async (req, res) => {
  const user = await logInUserService(req.body);

  console.log(user);

  res.status(200).json({ token: user.token, user: user.userObject });
});

export const logOutUserController = catchAsync(async (req, res, next) => {
  await logOutUserService(req.user);

  res.sendStatus(204);
});
