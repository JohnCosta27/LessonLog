import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

export type jwtToken = {
  token: string | null;
  error: string | null;
};

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
 * TODO: Check JWT body against DB user.
 *
 * @param token string of jwt to be verified.
 * @returns the jwt payload or an error.
 */
export const verifyJwt = (token: string): jwtToken => {
  try {
    const verified: object = jwt.verify(token, jwtSecret);
    return { token: token, error: '' };
  } catch (error: any) {
    return { token: '', error: 'Token is invalid' };
  }
};

export const generateAccessToken = (refreshToken: string): jwtToken => {
  const verifyToken: jwtToken = verifyJwt(refreshToken);

  if (verifyToken.error == null) {
    return { token: null, error: 'Invalid refresh token.' };
  } else {
    return { token: generateJwt({ hello: 'world' }, 3600), error: null };
  }
};
