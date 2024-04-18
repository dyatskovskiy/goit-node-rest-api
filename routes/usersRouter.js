import { Router } from "express";

import {
  isEmailExistsMiddleware,
  protectContactsMiddleware,
} from "../middlewares/userMiddlewares.js";

import { userDataValidator } from "../middlewares/userValidators.js";

import { userSchema } from "../schemas/usersSchemas.js";

import {
  getCurrentUserController,
  logInUserController,
  logOutUserController,
  signUpUserController,
} from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post(
  "/register",
  userDataValidator(userSchema),
  isEmailExistsMiddleware,
  signUpUserController
);

usersRouter.post("/login", userDataValidator(userSchema), logInUserController);

usersRouter.use(protectContactsMiddleware);

usersRouter.post("/logout", logOutUserController);

usersRouter.get(
  "/current",

  getCurrentUserController
);

export default usersRouter;
