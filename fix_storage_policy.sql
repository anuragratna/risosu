-- Enable RLS on storage.objects (if not already enabled, usually is)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 1. Policy to allow PUBLIC INSERT (Uploads) to 'resumes' bucket
CREATE POLICY "Allow public uploads to resumes"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

-- 2. Policy to allow PUBLIC READ (View/Download) from 'resumes' bucket
-- This allows the Admin Dashboard to view them without being logged in *as* the uploader
-- (Note: In a stricter app, you might restrict this to authenticated admins only, but for this simpler setup, public read or authenticated read is fine. authenticated read is better if admin is on same project)
CREATE POLICY "Allow authenticated read access to resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');

-- Optional: Allow public read if you want anyone with the link to view (easier for testing)
-- CREATE POLICY "Allow public read access to resumes"
-- ON storage.objects
-- FOR SELECT
-- TO public
-- USING (bucket_id = 'resumes');
