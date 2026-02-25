import type { SupabaseClient as OriginalClient } from "@supabase/supabase-js";
import type { Database as OriginalDatanbase } from "./database.types";

export type * from "@supabase/supabase-js";
export type * from "./database.types";

export type SupabaseClient = OriginalClient<OriginalDatanbase>;
