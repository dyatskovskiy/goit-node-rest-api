import { catchAsync } from "../helpers/catchAsync.js";
import {
  loginUserService,
  signUpUserService,
} from "../services/usersService.js";

export const signUpUserController = catchAsync(async (req, res) => {
  const newUser = await signUpUserService(req.body);

  res.status(201).json({ user: newUser });
});

export const logInUserController = catchAsync(async (req, res) => {
  const user = await loginUserService(req.body);

  console.log(user);

  res.status(200).json({ token: user.token, user: user.userObject });
});
