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

  const contact = await getContactByIdService(id);

  if (!contact) {
    throw HttpError(400, "Not found");
  }

  req.contact = contact;

  next();
});
