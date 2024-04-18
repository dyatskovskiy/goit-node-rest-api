import { Types } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { getContactByIdService } from "../services/contactService.js";

export const checkContactInDatabase = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) {
    throw HttpError(400, "Not found");
  }

  const contact = await getContactByIdService(id, req.user);

  if (!contact) {
    throw HttpError(400, "Not found");
  }

  req.contact = contact;

  next();
});

export const checkContactOwner = (req, res, next) => {
  const { contact, user } = req;

  if (contact.owner.toString() != user.id) {
    throw HttpError(404, "Not found");
  }

  next();
};
