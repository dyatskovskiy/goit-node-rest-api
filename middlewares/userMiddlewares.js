import { HttpError } from "../helpers/HttpError.js";

import { catchAsync } from "../helpers/catchAsync.js";

import { checkToken } from "../services/jwtService.js";

import {
  getUserByEmailService,
  findUserService,
} from "../services/usersService.js";

export const isEmailExistsMiddleware = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await getUserByEmailService(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  next();
});

export const protectPrivateRoutesMiddleware = catchAsync(
  async (req, res, next) => {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1];

    const userId = checkToken(token);

    if (!userId) throw HttpError(401, "Unauthorized");

    const currentUser = await findUserService(userId, token);

    if (!currentUser) throw HttpError(401, "Unauthorized");

    currentUser.password = undefined;

    req.user = currentUser;

    next();
  }
);
