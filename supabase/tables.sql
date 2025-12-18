-- Child accounts (NO passwords)
create table if not exists child_users (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  created_at timestamp default now()
);

-- Parent confirmations
create table if not exists parent_confirmations (
  id uuid primary key default uuid_generate_v4(),
  child_username text not null,
  parent_email text not null,
  confirmed boolean default false,
  created_at timestamp default now()
);

-- Test table
create table if not exists test_messages (
  id uuid primary key default uuid_generate_v4(),
  message text,
  created_at timestamp default now()
);
