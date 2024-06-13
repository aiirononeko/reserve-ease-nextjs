/*
 * stores RLS.
 * Select: Admin or User is in store.
 * Insert: Admin
 * Update: Admin or User is in store.
 * Delete: Admin
 */
alter table public.stores enable row level security;

create policy "Stores are viewable only admin or user is in store."
  on stores
  for select
  to authenticated
  using (
    (select auth.jwt()->>'role' = 'admin') or
    id in (
      select store_id
      from users
      where users.store_id = stores.id
    )
  );

create policy "Stores can insert only by admin."
  on stores
  for insert
  to authenticated
  with check (
    (select auth.jwt()->>'role' = 'admin')
  );

create policy "Stores can update only admin or user is in store."
  on stores for update
  to authenticated
  using (
    (select auth.jwt()->>'role' = 'admin') or
    id in (
      select store_id
      from users
      where users.store_id = stores.id
    )
  );

create policy "Stores can delete only by admin."
  on stores for delete
  to authenticated
  using (
    (select auth.jwt()->>'role' = 'admin')
  );


/*
 * users RLS.
 * Select: Admin or User is in store.
 * Insert: Admin or Authenticated User.
 * Update: Admin or User is in store.
 * Delete: Admin or User is in store.
 */
alter table public.users enable row level security;

create policy "Users can select only by admin or user is in store."
  on users
  for select
  to authenticated
  using (
    (select auth.jwt()->>'role' = 'admin') or
    (auth.jwt()->'app_metadata'->>'stores' = store_id::text)
  );

create policy "Users can insert only by authenticated user."
  on users 
  for insert
  to authenticated
  with check ( true );

create policy "Users can update own data."
  on users
  for update
  to authenticated
  using (
    (select auth.jwt()->>'role' = 'admin') or
    (auth.jwt()->'app_metadata'->>'stores' = store_id::text)
  );

create policy "Users can delete by only admin or user is in store."
  on users
  for delete
  to authenticated
  using (
    (select auth.jwt()->>'role' = 'admin') or
    (auth.jwt()->'app_metadata'->>'stores' = store_id::text)
  );
