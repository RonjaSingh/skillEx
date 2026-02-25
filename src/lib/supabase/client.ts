import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from './types'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  ) as SupabaseClient
}
