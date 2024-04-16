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

const contactsRouter = Router();

contactsRouter.get("/", listContacts);

contactsRouter.get("/:id", checkContactInDatabase, getOneContact);

contactsRouter.delete("/:id", checkContactInDatabase, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  checkContactInDatabase,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  checkContactInDatabase,
  validateBody(updateStatusSchema),
  updateStatusContact
);

export default contactsRouter;
