import { Router } from "express";

import {
  isEmailExistsMiddleware,
  protectPrivateRoutesMiddleware,
  uploadAvatarMiddleware,
} from "../middlewares/userMiddlewares.js";

import {
  updateSubscriptionValidator,
  userDataValidator,
  verificationResendingEmailValidator,
} from "../middlewares/userValidators.js";

import {
  subscriptionUpdateSchema,
  userSchema,
  verificationResendingEmailSchema,
} from "../schemas/usersSchemas.js";

import {
  getCurrentUserController,
  logInUserController,
  logOutUserController,
  signUpUserController,
  updateAvatarController,
  updateSubscriptionController,
  verificationResendingEmailController,
  verificationUserController,
} from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post(
  "/register",
  userDataValidator(userSchema),
  isEmailExistsMiddleware,
  signUpUserController
);

usersRouter.get("/verify/:verificationToken", verificationUserController);
usersRouter.post(
  "/verify",
  verificationResendingEmailValidator(verificationResendingEmailSchema),
  verificationResendingEmailController
);

usersRouter.post("/login", userDataValidator(userSchema), logInUserController);

//private routes

usersRouter.use(protectPrivateRoutesMiddleware);

usersRouter.get("/current", getCurrentUserController);

usersRouter.post("/logout", logOutUserController);

usersRouter.patch(
  "/subscription",
  updateSubscriptionValidator(subscriptionUpdateSchema),
  updateSubscriptionController
);

usersRouter.patch("/avatars", uploadAvatarMiddleware, updateAvatarController);

export default usersRouter;
