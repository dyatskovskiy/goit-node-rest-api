import { Router } from "express";
import { isEmailExists } from "../middlewares/userMiddlewares.js";
import { signUpUserValidator } from "../middlewares/userValidators.js";
import { signUpUserSchema } from "../schemas/usersSchemas.js";
import { signUpUserController } from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post(
  "/register",
  signUpUserValidator(signUpUserSchema),
  isEmailExists,
  signUpUserController
);

usersRouter.post("/login");

export default usersRouter;
