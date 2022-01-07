import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.SUPABASE_KEY) {
  throw new Error('SUPABASE_KEY must be present in the .env file!');
}

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL must be present in the .env file!');
}

export const supabaseKey: string = <string>process.env.SUPABASE_KEY;
export const supabaseUrl: string = <string>process.env.SUPABASE_URL;
