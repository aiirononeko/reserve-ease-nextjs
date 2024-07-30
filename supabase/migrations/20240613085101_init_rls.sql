/*
 * Select: Everyone.
 * Insert: Authenticated Users.
 * Update: Authenticated Users.
 * Delete: Authenticated Users.
 */
alter table public.stores enable row level security;

create policy "Stores can visible by everyone"
  on stores
  for select
  to authenticated, anon
  using (true);

create policy "Stores can insert only by authenticated user"
  on stores
  for insert
  to authenticated
  with check (true);

create policy "Stores can be updated only by their own data"
  on stores
  for update
  to authenticated
  using (
    (auth.jwt() -> 'user_metadata' ->> 'store_id')::text = id::text
  )
  with check (
    (auth.jwt() -> 'user_metadata' ->> 'store_id')::text = id::text
  );

create policy "Stores can be deleted only by their own data"
  on stores
  for delete
  to authenticated
  using (
    (auth.jwt() -> 'user_metadata' ->> 'store_id')::text = id::text
  );
