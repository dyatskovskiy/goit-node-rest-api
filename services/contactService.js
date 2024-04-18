import { HttpError } from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

export const createContactService = async (data, owner) => {
  const newContact = await Contact.create({
    ...data,
    owner: owner.id,
  });

  return newContact;
};

export const listContactsService = async (currentUser) => {
  const contacts = await Contact.find({ owner: currentUser.id });

  return contacts;
};

export const getContactByIdService = async (id) => {
  const contact = await Contact.findById(id);

  return contact;
};

export const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
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
