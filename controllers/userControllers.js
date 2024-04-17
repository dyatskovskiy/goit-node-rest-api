import { catchAsync } from "../helpers/catchAsync.js";
import { signUpUserService } from "../services/usersService.js";

export const signUpUserController = catchAsync(async (req, res) => {
  const newUser = await signUpUserService(req.body);

  res.status(201).json({ user: newUser });
});
