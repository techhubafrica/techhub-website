create table public.applications (
  id uuid primary key default gen_random_uuid(),
  application_type text not null check (application_type in ('role', 'internship')),
  role_title text,
  full_name text not null,
  middle_name text,
  email text not null,
  phone text,
  linkedin_url text,
  position text,
  cover_letter text,
  resume_path text,
  resume_name text,
  consent boolean not null default false,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;

-- Written only by the submit-application edge function (service role); no public access.
grant all on public.applications to service_role;

-- Resumes: applicants may upload into the private bucket; reads happen only server-side.
create policy "Applicants can upload resumes"
on storage.objects for insert to anon
with check (bucket_id = 'resumes');
