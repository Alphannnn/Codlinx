-- ============================================================================
-- Codlinx — initial schema
-- ----------------------------------------------------------------------------
-- Apply this in the Supabase SQL editor or via `psql`.
-- The schema assumes the JWT claim `email` is present (Supabase default) and
-- treats one specific address as "admin" via the `public.is_admin()` function
-- below. To change the admin, edit the email literal in that function and
-- re-run the CREATE OR REPLACE statement — no other changes are needed.
-- ============================================================================

-- Helper: is the current request from the admin?
-- We hardcode the email here because Supabase's hosted Postgres doesn't allow
-- per-database GUC parameters (ALTER DATABASE ... SET requires superuser).
-- Keep this in sync with NEXT_PUBLIC_ADMIN_EMAIL in your app env.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    lower(coalesce(auth.jwt() ->> 'email', '')) = 'adnan.mustafa@toptal.com',

    false
  );
$$;

-- ============================================================================
-- profiles — 1:1 with auth.users
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  role_title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- Auto-create profile on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- meetings — booked discovery / kickoff slots
-- ============================================================================
create type meeting_status as enum ('pending', 'confirmed', 'declined', 'completed', 'cancelled');

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  slot_start timestamptz not null,
  slot_end timestamptz not null,
  status meeting_status not null default 'pending',
  topic text,
  brief jsonb default '{}'::jsonb,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists meetings_user_idx on public.meetings (user_id, slot_start desc);
create index if not exists meetings_status_idx on public.meetings (status, slot_start);
create index if not exists meetings_slot_idx on public.meetings (slot_start);

alter table public.meetings enable row level security;

drop policy if exists "meetings_select" on public.meetings;
create policy "meetings_select" on public.meetings
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "meetings_insert_own" on public.meetings;
create policy "meetings_insert_own" on public.meetings
  for insert with check (auth.uid() = user_id);

drop policy if exists "meetings_update_admin_or_own_cancel" on public.meetings;
create policy "meetings_update_admin_or_own_cancel" on public.meetings
  for update using (public.is_admin() or auth.uid() = user_id);

drop policy if exists "meetings_delete_admin" on public.meetings;
create policy "meetings_delete_admin" on public.meetings
  for delete using (public.is_admin());

-- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists meetings_touch on public.meetings;
create trigger meetings_touch before update on public.meetings
  for each row execute procedure public.touch_updated_at();

-- ============================================================================
-- availability — admin-controlled weekly windows
-- ============================================================================
create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_minute smallint not null check (start_minute between 0 and 1440),
  end_minute smallint not null check (end_minute between 0 and 1440),
  slot_length_min smallint not null default 30,
  valid_from date,
  valid_to date,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists availability_day_idx on public.availability (day_of_week, is_active);

alter table public.availability enable row level security;

drop policy if exists "availability_read_all" on public.availability;
create policy "availability_read_all" on public.availability
  for select using (true);

drop policy if exists "availability_write_admin" on public.availability;
create policy "availability_write_admin" on public.availability
  for all using (public.is_admin()) with check (public.is_admin());

-- Blocked slots (holidays, exceptions)
create table if not exists public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists blocked_slots_range_idx on public.blocked_slots (starts_at, ends_at);

alter table public.blocked_slots enable row level security;

drop policy if exists "blocked_slots_read_all" on public.blocked_slots;
create policy "blocked_slots_read_all" on public.blocked_slots
  for select using (true);

drop policy if exists "blocked_slots_write_admin" on public.blocked_slots;
create policy "blocked_slots_write_admin" on public.blocked_slots
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- blog_posts — admin-editable
-- ============================================================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null,
  read_time text not null default '5 min read',
  author text not null,
  author_role text,
  hue text default 'rgba(63,201,180,0.22)',
  cover_image text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (is_published, published_at desc);

alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_read_published" on public.blog_posts;
create policy "blog_posts_read_published" on public.blog_posts
  for select using (is_published = true or public.is_admin());

drop policy if exists "blog_posts_write_admin" on public.blog_posts;
create policy "blog_posts_write_admin" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts
  for each row execute procedure public.touch_updated_at();

-- ============================================================================
-- career_postings — admin-editable
-- ============================================================================
create table if not exists public.career_postings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  level text not null,
  team text not null,
  location text not null default 'Remote · Global',
  employment_type text not null default 'Full-time',
  description text not null,
  requirements jsonb default '[]'::jsonb,
  perks jsonb default '[]'::jsonb,
  is_open boolean not null default true,
  posted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists career_postings_open_idx on public.career_postings (is_open, posted_at desc);

alter table public.career_postings enable row level security;

drop policy if exists "career_postings_read_open" on public.career_postings;
create policy "career_postings_read_open" on public.career_postings
  for select using (is_open = true or public.is_admin());

drop policy if exists "career_postings_write_admin" on public.career_postings;
create policy "career_postings_write_admin" on public.career_postings
  for all using (public.is_admin()) with check (public.is_admin());

drop trigger if exists career_postings_touch on public.career_postings;
create trigger career_postings_touch before update on public.career_postings
  for each row execute procedure public.touch_updated_at();

-- ============================================================================
-- Admin email is defined inside public.is_admin() above. To change it:
--   1. Edit the email literal in the CREATE OR REPLACE FUNCTION block.
--   2. Re-run that statement.
--   3. Update NEXT_PUBLIC_ADMIN_EMAIL in your .env.local to match.
-- ============================================================================
