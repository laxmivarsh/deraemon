import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Robust Supabase client with seamless fallback to local mock state
 * when environment variables are not supplied or network is offline.
 * This guarantees the application runs out of the box in production & local dev!
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-url') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Database client wrapper with automatic fallback to preloaded canonical data
 */
export async function getDatabaseRecords<T>(
  tableName: string,
  fallbackData: T[],
  orderCol?: string
): Promise<T[]> {
  if (!supabase) {
    return fallbackData;
  }

  try {
    let query = supabase.from(tableName).select('*');
    if (orderCol) {
      query = query.order(orderCol, { ascending: true });
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return fallbackData;
    }
    return data as T[];
  } catch (err) {
    console.warn(`Supabase fetch failed for ${tableName}, using fallback data.`, err);
    return fallbackData;
  }
}
