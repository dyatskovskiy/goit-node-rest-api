import { HttpError } from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { findUserByEmail } from "../services/usersService.js";

export const isEmailExists = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  next();
});

export const checkLogInCredentialsMiddleware = catchAsync(
  (req, res, next) => {}
);
