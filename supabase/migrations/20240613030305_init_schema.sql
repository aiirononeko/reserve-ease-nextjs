/*
 * stores.
 * 店舗データ.
 */
create table public.stores (
  id bigserial not null,
  name varchar(255) not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  primary key (id)
);

/*
 * users.
 * ユーザー（店舗スタッフ）データ.
 */
create table public.users (
  id uuid not null references auth.users on delete cascade,
  email varchar(255) not null unique,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  
  store_id bigserial not null references public.stores(id) on delete cascade,

  primary key (id)
);
