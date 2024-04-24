import { Schema, model } from "mongoose";

import gravatar from "gravatar";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      uniqe: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    avatarURL: String,

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.avatarURL = gravatar.url(this.email, {
      d: "retro",
      s: "200",
      protocol: "https",
    });
  }

  next();
});

const User = model("user", userSchema);

export default User;
