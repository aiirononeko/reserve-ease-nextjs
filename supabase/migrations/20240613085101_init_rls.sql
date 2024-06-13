/*
 * stores RLS.
 * Select: Admin or associated Owner or Staff.
 * Insert: Admin
 * Update: Admin or associated Owner or Staff.
 * Delete: Admin
 */
alter table public.stores enable row level security;

create policy "Stores are viewable only by admin or associated owner or staff"
  on stores
  for select
  to authenticated
  using (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin' or
        (roles.name in ('owner', 'staff') and users.store_id = stores.id)
      )
    )
  );

create policy "Stores can insert only by admin."
  on stores
  for insert
  to authenticated
  with check (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin'
      )
    )
  );

create policy "Stores are update only by admin or associated owner or staff"
  on stores for update
  to authenticated
  using (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin' or
        (roles.name in ('owner', 'staff') and users.store_id = stores.id)
      )
    )
  );

create policy "Stores can delete only by admin."
  on stores for delete
  to authenticated
  using (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin'
      )
    )
  );

/*
 * roles RLS.
 */
alter table public.roles enable row level security;

/*
 * users RLS.
 * Select: Admin or associated Owner or Staff.
 * Insert: Admin or Owner.
 * Update: Admin or associated Owner or Staff.
 * Delete: Admin or Owner.
 */
alter table public.users enable row level security;

create policy "Users are viewable only by admin or associated owner or staff"
  on users
  for select
  to authenticated
  using (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin' or
        (roles.name in ('owner', 'staff') and users.store_id = (select store_id from users where id = auth.uid()))
      )
    )
  );

create policy "Users can insert only by admin or owner."
  on users
  for insert
  to authenticated
  with check (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin' or
        (roles.name = 'owner' and users.store_id = (select store_id from users where id = auth.uid()))
      )
    )
  );

create policy "Users can update only admin or their own data."
  on users
  for update
  to authenticated
  using (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() or (
        roles.name = 'admin'
      )
    )
  );

create policy "Users can delete by only admin or owner."
  on users
  for delete
  to authenticated
  using (
    exists (
      select 1 from users
      join roles on users.role_id = roles.id
      where users.id = auth.uid() and (
        roles.name = 'admin' or
        (roles.name = 'owner' and users.store_id = (select store_id from users where id = auth.uid()))
      )
    )
  );
