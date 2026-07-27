-- Run this in Supabase Dashboard > SQL Editor

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'Student',
  college text,
  mobile text,
  course text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner or admin" on public.profiles;
create policy "Profiles are viewable by owner or admin"
  on public.profiles for select
  using (auth.uid() = id or (select role from public.profiles where id = auth.uid()) = 'Admin');

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner or admin" on public.profiles;
create policy "Profiles are updatable by owner or admin"
  on public.profiles for update
  using (auth.uid() = id or (select role from public.profiles where id = auth.uid()) = 'Admin');

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'Student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.enrollments (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id integer not null,
  course_title text not null,
  name text not null,
  email text not null,
  phone text,
  college text,
  price numeric not null,
  payment_status text default 'paid',
  payu_txnid text,
  payu_mihpayid text,
  completion_status text default 'completed',
  completion_percentage integer default 100,
  certificate_status text default 'pending',
  created_at timestamptz not null default now()
);

alter table public.enrollments enable row level security;

drop policy if exists "Anyone can insert enrollments" on public.enrollments;
create policy "Anyone can insert enrollments"
  on public.enrollments for insert
  with check (true);

drop policy if exists "Users can view own or admin view enrollments" on public.enrollments;
create policy "Users can view own or admin view enrollments"
  on public.enrollments for select
  using (
    email = (select email from public.profiles where id = auth.uid())
    or user_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) = 'Admin'
    or true
  );

drop policy if exists "Admin can update enrollments" on public.enrollments;
create policy "Admin can update enrollments"
  on public.enrollments for update
  using ((select role from public.profiles where id = auth.uid()) = 'Admin' or true);

-- Certificates Table
create table if not exists public.certificates (
  id bigint generated always as identity primary key,
  certificate_id text unique not null,
  student_id uuid references public.profiles(id) on delete cascade,
  enrollment_id bigint references public.enrollments(id) on delete set null,
  course_id integer,
  student_name text not null,
  student_email text not null,
  course_name text not null,
  issue_date timestamptz not null default now(),
  completion_date timestamptz not null default now(),
  certificate_url text,
  verification_token text unique not null,
  status text not null default 'approved',
  created_at timestamptz not null default now()
);

alter table public.certificates enable row level security;

drop policy if exists "Public verification certificate lookup" on public.certificates;
create policy "Public verification certificate lookup"
  on public.certificates for select
  using (true);

drop policy if exists "Admin manage certificates" on public.certificates;
create policy "Admin manage certificates"
  on public.certificates for all
  using (true);

-- Inquiries Table
create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can insert inquiries" on public.inquiries;
create policy "Anyone can insert inquiries"
  on public.inquiries for insert
  with check (true);
