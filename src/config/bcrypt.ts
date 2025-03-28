import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

