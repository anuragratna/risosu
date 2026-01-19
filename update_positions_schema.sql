-- Run this key in your Supabase SQL Editor

ALTER TABLE positions 
ADD COLUMN description TEXT;

-- Update RLS if needed (usually implicit for owner, but good to check)
-- No RLS update needed for just adding a column if policies are on table level.
