import path from "path";

import fs from "fs/promises";

import multer from "multer";

import { v4 } from "uuid";

import Jimp from "jimp";

import { HttpError } from "../helpers/HttpError.js";

export class ImageService {
  static initUpdloadImageMiddleware(fieldName) {
    //config storage
    const multerStorage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, path.join("tmp"));
      },

      filename: (req, file, callback) => {
        callback(null, `tmpAvatar.jpeg`);
      },
    });

    //config filter
    const multerFilter = (req, file, callback) => {
      if (file.mimetype.startsWith("image/")) {
        if (file.mimetype === "image/webp") {
          callback(
            HttpError(400, "Sorry, WebP format is not supported"),
            false
          );
        }
        callback(null, true);
      } else {
        callback(HttpError(400, "Please, upload images only"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      limits: {
        fileSize: 4 * 1024 * 1024,
      },
    }).single(fieldName);
  }

  static async saveImage(user) {
    const fileName = `${user.id}-${v4()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", "avatars");

    //  image resize and save
    const avatar = (await Jimp.read("tmp/tmpAvatar.jpeg"))
      .resize(250, 250)
      .writeAsync(path.join(fullFilePath, fileName));

    // clean tmp dir
    await fs.rm("tmp/tmpAvatar.jpeg");

    return path.join("avatars", fileName);
  }
}
