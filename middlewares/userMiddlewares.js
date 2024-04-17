import { HttpError } from "../helpers/HttpError.js";

import { catchAsync } from "../helpers/catchAsync.js";

import { checkToken } from "../services/jwtService.js";

import {
  getUserByEmailService,
  getUserByIdService,
} from "../services/usersService.js";

export const isEmailExistsMiddleware = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await getUserByEmailService(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  next();
});

export const protectContactsMiddleware = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  const userId = checkToken(token);

  if (!userId) throw HttpError(401, "Unauthorized");

  const currentUser = await getUserByIdService(userId);

  if (!currentUser) throw HttpError(401, "Unauthorized");

  req.user = currentUser;

  next();
});
