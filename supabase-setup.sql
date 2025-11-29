-- Create the form_submissions table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  query TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- Optional: Enable Row Level Security (RLS) if you want to restrict access
-- ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy to allow inserts from anyone (for form submissions)
-- CREATE POLICY "Allow public inserts" ON form_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Optional: Create a policy to allow reads only for authenticated users (for admin dashboard)
-- CREATE POLICY "Allow authenticated reads" ON form_submissions FOR SELECT TO authenticated USING (true);

