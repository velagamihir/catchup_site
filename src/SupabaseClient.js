// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yvwotbhqzesrfxlatmyd.supabase.co"; // replace with your Supabase project URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2d290YmhxemVzcmZ4bGF0bXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzI2NjMsImV4cCI6MjA3NTUwODY2M30.7OQQ4mKo0eUiWD07kwyQzLJ10mj0jBIzT7q3ZvlhERw"; // replace with your Supabase anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
