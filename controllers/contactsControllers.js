import { catchAsync } from "../helpers/catchAsync.js";

import {
  createContactService,
  deleteContactService,
  listContactsService,
  updateContactService,
  updateStatusService,
} from "../services/contactService.js";

export const createContact = catchAsync(async (req, res) => {
  const result = await createContactService(req.body, req.user);

  res.status(201).json(result);
});

export const listContacts = catchAsync(async (req, res) => {
  const { contacts, totalResults } = await listContactsService(
    req.user,
    req.query
  );

  res.status(200).json({ total: totalResults, contacts: contacts });
});

export const getOneContact = (req, res) => {
  const { contact } = req;

  res.status(200).json(contact);
};

export const deleteContact = catchAsync(async (req, res) => {
  const { contact } = req;

  await deleteContactService(contact.id);

  res.status(200).json(contact);
});

export const updateContact = catchAsync(async (req, res) => {
  const { contact } = req;

  const result = await updateContactService(contact.id, req.body);

  res.status(200).json(result);
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const { contact } = req;

  const result = await updateStatusService(contact.id, {
    favorite: req.body.favorite,
  });

  res.status(200).json(result);
});
