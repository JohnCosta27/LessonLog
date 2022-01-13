import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

/**
 * Function to sign and generate jwt.
 *
 * @param expiryTime integer that represents seconds.
 * @returns jwt as a string.
 */
export const generateJwt = (payload: object, expiryTime: number): string => {
  return jwt.sign(payload, jwtSecret, { algorithm: 'HS512' });
};

/**
 * Wrapper function to verify JWTs.
 *
 * @param token string of jwt to be verified.
 * @returns the jwt payload or an error.
 */
export const verifyJwt = (token: string): any => {
  try {
    const verified: object = jwt.verify(token, jwtSecret);
    return verified;
  } catch (error: any) {
    return error;
  }
};
