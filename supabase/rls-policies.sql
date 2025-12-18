-- Enable RLS
alter table child_users enable row level security;
alter table parent_confirmations enable row level security;
alter table test_messages enable row level security;

-- CHILD USERS
create policy "Anyone can create child account"
on child_users
for insert
with check (true);

create policy "No public read of child users"
on child_users
for select
using (false);

-- PARENT CONFIRMATIONS
create policy "Anyone can create parent confirmation"
on parent_confirmations
for insert
with check (true);

create policy "Parent can read own confirmation"
on parent_confirmations
for select
using (auth.email() = parent_email);

create policy "Parent can confirm child"
on parent_confirmations
for update
using (auth.email() = parent_email);

-- TEST MESSAGES
create policy "Public insert test messages"
on test_messages
for insert
with check (true);

create policy "Public read test messages"
on test_messages
for select
using (true);
