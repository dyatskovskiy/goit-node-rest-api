import bcrypt from "bcrypt";

export const hashPassword = async (creds) => {
  const { password } = creds;
  const { SALT_ROUNDS } = process.env;

  const salt = await bcrypt.genSalt(+SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const validatePassword = async (candidate, hash) => {
  const isValid = await bcrypt.compare(candidate, hash);

  return isValid;
};
