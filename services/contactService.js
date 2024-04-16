import { HttpError } from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getContactsService = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getOneContactService = async (id) => {
  const contact = await Contact.findById(id);

  return contact;
};

export const createContactService = async (data) => {
  const newContact = await Contact.create(data);

  return newContact;
};

export const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);

  return contact;
};

export const updateContactService = async (id, data) => {
  if (Object.keys(data).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedContact;
};

export const updateStatusService = async (id, data) => {
  if (Object.keys(data).length === 0 || data.favorite === undefined) {
    throw HttpError(400, "Set the 'favorite' status");
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedContact;
};
