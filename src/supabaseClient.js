import { createClient } from '@supabase/supabase-js'

// Environment variables with hardcoded fallbacks for production reliability
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hnygqubocyzrnqqmbpeg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
