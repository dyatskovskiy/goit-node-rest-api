import { HttpError } from "../helpers/HttpError.js";

import { catchAsync } from "../helpers/catchAsync.js";

import { findUserByEmailService } from "../services/usersService.js";

export const isEmailExistsMiddleware = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmailService(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  next();
});
