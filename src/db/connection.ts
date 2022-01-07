import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../config/env';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export = supabase;
