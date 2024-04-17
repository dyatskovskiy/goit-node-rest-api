import User from "../models/user.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const signUpUserService = async (credentials) => {
  const newUser = await User.create(credentials);

  newUser.password = undefined;

  return newUser;
};
