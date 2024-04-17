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

import { checkContactInDatabase } from "../middlewares/contactMiddlewares.js";

import { protectContactsMiddleware } from "../middlewares/userMiddlewares.js";

const contactsRouter = Router();

contactsRouter.get("/", protectContactsMiddleware, listContacts);

contactsRouter.get(
  "/:id",
  protectContactsMiddleware,
  checkContactInDatabase,
  getOneContact
);

contactsRouter.delete(
  "/:id",
  protectContactsMiddleware,
  checkContactInDatabase,
  deleteContact
);

contactsRouter.post(
  "/",
  protectContactsMiddleware,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  protectContactsMiddleware,
  checkContactInDatabase,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  protectContactsMiddleware,
  checkContactInDatabase,
  validateBody(updateStatusSchema),
  updateStatusContact
);

export default contactsRouter;
