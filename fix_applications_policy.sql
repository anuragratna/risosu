-- Allow public (anonymous) users to INSERT into the 'applications' table
-- This is required for the "Apply Now" form to work for unauthenticated visitors.

CREATE POLICY "Allow public application submissions"
ON public.applications
FOR INSERT
TO public
WITH CHECK (true);

-- Ensure RLS is enabled (it likely is, which is why it failed)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (Admins) to SELECT (view) applications
-- (You might already have this or a similar policy, but running it again usually just errors if it exists or creates a duplicate if named differently. Better to use a unique name)
CREATE POLICY "Allow authenticated admins to view applications"
ON public.applications
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users (Admins) to DELETE applications
CREATE POLICY "Allow authenticated admins to delete applications"
ON public.applications
FOR DELETE
TO authenticated
USING (true);
