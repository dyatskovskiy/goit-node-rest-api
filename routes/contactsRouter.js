import { Router } from "express";

import { validateBody } from "../middlewares/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

import {
  listContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import {
  checkContactInDatabase,
  checkContactOwner,
} from "../middlewares/contactMiddlewares.js";

import { protectPrivateRoutesMiddleware } from "../middlewares/userMiddlewares.js";

const contactsRouter = Router();

contactsRouter.use(protectPrivateRoutesMiddleware);

contactsRouter.use("/:id", checkContactInDatabase, checkContactOwner);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.get("/", listContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusSchema),
  updateStatusContact
);

export default contactsRouter;
