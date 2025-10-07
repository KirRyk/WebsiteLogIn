import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hfrxoostlelrnlabcfyd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmcnhvb3N0bGVscm5sYWJjZnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzAxNTksImV4cCI6MjA2NjUwNjE1OX0.zfEt2Wwkig4t_cQvgFBcdMoQ7aDOGOgC5ZjPZtvNJiI"

export const supabase = createClient(supabaseUrl, supabaseKey)