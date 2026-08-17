create extension if not exists pgcrypto;
create type chessapex_tier as enum ('foundation','developing','tactical','strategic','expert');
create table if not exists profiles (id uuid primary key default gen_random_uuid(), email text unique not null, display_name text not null default 'New Climber', rating integer not null default 400, tier chessapex_tier not null default 'foundation', streak_days integer not null default 0, created_at timestamptz not null default now());
create table if not exists lesson_progress (id uuid primary key default gen_random_uuid(), profile_id uuid not null references profiles(id) on delete cascade, lesson_id text not null, mastery numeric(4,3) not null default 0, attempts integer not null default 0, next_review_at timestamptz not null default now(), unique(profile_id, lesson_id));
create table if not exists games (id uuid primary key default gen_random_uuid(), profile_id uuid references profiles(id) on delete set null, opponent text not null default 'weak-ai', result text, pgn text not null, max_evaluation numeric(6,2), created_at timestamptz not null default now());
create index if not exists games_profile_created_idx on games(profile_id, created_at desc);
create index if not exists lesson_progress_due_idx on lesson_progress(profile_id, next_review_at);
