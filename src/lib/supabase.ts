import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const supabaseUrl = 'https://jccygoycflqhoglahfkb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjY3lnb3ljZmxxaG9nbGFoZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODYxNDEsImV4cCI6MjA4MzM2MjE0MX0.qbPc0WuTuZUSEhSYfl91BAZEabcivIXkiEP2J35Tq5Y'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)