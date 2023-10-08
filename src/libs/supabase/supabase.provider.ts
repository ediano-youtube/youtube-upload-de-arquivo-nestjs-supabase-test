import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URI,
  process.env.SUPABASE_KEY,
  { auth: { persistSession: false } },
);

export const SupabaseProvider = {
  provide: 'SUPABASE_PROVIDER',
  useValue: supabase,
};
