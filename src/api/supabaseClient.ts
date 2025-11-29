import {createClient} from "@supabase/supabase-js"
//
// const supabaseUrl = 'https://quqwekpgxizfxvhdzbbx.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cXdla3BneGl6Znh2aGR6YmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTc3MTAsImV4cCI6MjA3ODkzMzcxMH0.VHvmPE6PZdpq113Gb4L8HTnSeeFdlFHLvM3rJflF3s0'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
