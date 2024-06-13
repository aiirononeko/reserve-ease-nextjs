/*
 * 店舗.
 */
create table public.stores (
  id bigserial not null,
  name varchar(100) not null,
  address varchar(512) not null unique,
  phone_number varchar(15) not null unique,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  primary key (id)
);

/*
 * ロール.
 */
create table public.roles (
  id bigserial not null,
  name varchar(15) not null,

  primary key (id)
);

/*
 * ユーザー.
 */
create table public.users (
  id uuid not null references auth.users on delete cascade,
  email varchar(256) not null unique,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  role_id bigserial not null references public.roles(id) on delete cascade,
  store_id bigserial not null references public.stores(id) on delete cascade,

  primary key (id)
);
