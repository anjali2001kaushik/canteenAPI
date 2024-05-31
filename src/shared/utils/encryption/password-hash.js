import bcrypt from 'bcrypt';
const SALT = 10;

export const passwordHashing = async (plainPassword) => {
  try {
    const hashPassword = await bcrypt.hash(plainPassword, SALT);
    // console.log("Plain Password ", plainPassword, " Hash Password ", hashPassword);
    return hashPassword;
  } catch (error) {
    // console.error("Error occurred during password hashing:", error);
    throw error;
  }
};

export const comparePassword = async (plainPassword, hashPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    // console.error("Error occurred during password comparison:", error);
    throw error;
  }
};