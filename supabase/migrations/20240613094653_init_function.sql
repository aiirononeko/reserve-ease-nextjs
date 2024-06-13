-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, role_id, store_id, created_at, updated_at)
  values (new.id, new.email, new.user_metadata ->> 'role_id', new.user_metadata ->> 'store_id', NOW(), NOW());
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
