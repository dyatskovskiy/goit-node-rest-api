import { Router } from "express";

import {
  isEmailExistsMiddleware,
  protectPrivateRoutesMiddleware,
} from "../middlewares/userMiddlewares.js";

import {
  updateSubscriptionValidator,
  userDataValidator,
} from "../middlewares/userValidators.js";

import {
  subscriptionUpdateSchema,
  userSchema,
} from "../schemas/usersSchemas.js";

import {
  getCurrentUserController,
  logInUserController,
  logOutUserController,
  signUpUserController,
  updatSubscriptionController,
} from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post(
  "/register",
  userDataValidator(userSchema),
  isEmailExistsMiddleware,
  signUpUserController
);

usersRouter.post("/login", userDataValidator(userSchema), logInUserController);

usersRouter.use(protectPrivateRoutesMiddleware);

usersRouter.get("/current", getCurrentUserController);

usersRouter.post("/logout", logOutUserController);

usersRouter.patch(
  "/subscription",
  updateSubscriptionValidator(subscriptionUpdateSchema),
  updatSubscriptionController
);

export default usersRouter;
