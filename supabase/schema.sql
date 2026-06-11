-- Run this in Supabase Dashboard > SQL Editor

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'Student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

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
  course_id integer not null,
  course_title text not null,
  name text not null,
  email text not null,
  phone text,
  college text,
  price numeric not null,
  payment_status text default 'pending',
  payu_txnid text,
  payu_mihpayid text,
  created_at timestamptz not null default now()
);

alter table public.enrollments enable row level security;

drop policy if exists "Anyone can insert enrollments" on public.enrollments;
create policy "Anyone can insert enrollments"
  on public.enrollments for insert
  with check (true);

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
