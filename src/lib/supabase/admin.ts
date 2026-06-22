import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Admin client using the service role key.
 * NEVER import this in Client Components or expose to the browser.
 * Use only in server-side API routes for privileged operations.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
