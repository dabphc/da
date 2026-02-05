import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables. Please check your Vercel project settings.");
}

// Initialize with fallback values to prevent crash, but auth calls will fail gracefully
export const supabase = createClient(supabaseUrl || "", supabaseKey || "")