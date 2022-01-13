import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

if (!process.env.SUPABASE_KEY) {
  throw new Error('SUPABASE_KEY must be present in the .env file!');
}

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL must be present in the .env file!');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be present in the .env file!');
}

export const supabaseKey: string = <string>process.env.SUPABASE_KEY;
export const supabaseUrl: string = <string>process.env.SUPABASE_URL;
export const jwtSecret: Secret = <Secret>process.env.JWT_SECRET;
