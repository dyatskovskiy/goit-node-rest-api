import { HttpError } from "../helpers/HttpError.js";

import { catchAsync } from "../helpers/catchAsync.js";

import {
  createContactService,
  deleteContactService,
  getContactsService,
  getOneContactService,
  updateContactService,
  updateStatusService,
} from "../services/contactService.js";

export const listContacts = catchAsync(async (req, res) => {
  const result = await getContactsService();

  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const result = await getOneContactService(req.params.id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

export const deleteContact = catchAsync(async (req, res) => {
  const result = await deleteContactService(req.params.id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

export const createContact = catchAsync(async (req, res) => {
  const result = await createContactService(req.body);

  res.status(201).json({ code: 201, data: result });
});

export const updateContact = catchAsync(async (req, res) => {
  const result = await updateContactService(req.params.id, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const result = await updateStatusService(req.params.id, {
    favorite: req.body.favorite,
  });

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
});
