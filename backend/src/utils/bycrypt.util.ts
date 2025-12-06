import bcrypt from "bcrypt";

const saltRounds = 10;
/**
 * creating hash password
 * @param {String} password user password
 * @return {String} will return hashed password
 */
export const createHashPassword = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

/**
 * verifying the password
 * @param {Sting} password user password
 * @param {String} hashPassword hashed password
 * @return {Boolean} will return true or false
 */
export const verifyPasswordMethod = async (
  password: string,
  hashPassword: string
) => {
  let response = await bcrypt.compare(password, hashPassword);
  return response;
};
