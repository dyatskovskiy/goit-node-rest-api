import Contact from "../models/contact.js";
import { HttpError } from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await Contact.find();
  res.status(200).json({ code: 200, quantity: result.length, data: result });
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({ code: 200, data: result });
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ code: 200, data: result });
});

export const createContact = catchAsync(async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({ code: 201, data: result });
});

export const updateContact = catchAsync(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({ code: 200, data: result });
});

export const updateStatusContact = catchAsync(async (req, res) => {
  if (Object.keys(req.body).length === 0 || req.body.favorite === undefined) {
    throw HttpError(400, "Set the 'favorite' status");
  }

  const { id } = req.params;
  const status = req.body.favorite;

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite: status },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({ code: 200, data: result });
});
