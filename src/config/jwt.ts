import jwt from 'jsonwebtoken';


export const generateToken = (payload: any) => {
  const secret = process.env.JWT_SECRET || '102030';
  return jwt.sign(
    payload,
    secret
  );
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || '102030';
  try {
    const verify = jwt.verify(token, secret) ? true : false;
    return verify;
  } catch (error) {
    return false;
  }   
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};