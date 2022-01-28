import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be present in the .env file!');
}

export const jwtSecret: Secret = <Secret>process.env.JWT_SECRET;
