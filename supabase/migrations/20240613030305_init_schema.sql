/*
 * 店舗.
 */
create table public.stores (
  id bigserial not null,
  name varchar(100) not null,
  description varchar(512),
  post_code varchar(8) unique,
  address varchar(512) unique,
  phone_number varchar(15) unique,
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

-- /*
--  * 営業時間.
--  */
-- create table public.business_hours (
--   id bigserial not null,
--   day_of_week int not null, -- 0 = Sunday, 1 = Monday, 2 = Tuesday ... 6 = Saturday
--   open_time time not null,
--   close_time time not null,
--   created_at timestamp with time zone not null default now(),
--   updated_at timestamp with time zone not null default now(),
--
--   store_id bigserial not null references public.stores(id) on delete cascade,
--
--   primary key (id)
-- )
--
-- /*
--  * サービス.
--  */
-- create table public.services (
--   id bigserial not null,
--   name varchar(15) not null,
--   description varchar(512) not null,
--   amount int not null,
--   discount int not null,
--
--   store_id bigserial not null references public.stores(id) on delete cascade,
--   user_id bigserial not null references public.users(id) on delete cascade,
--
--   primary key (id)
-- )
--
-- /*
--  * 顧客.
--  */
-- create table public.customers (
--   id bigserial not null,
--   first_name varchar(10) not null,
--   last_name varchar(10) not null,
--   phone_number varchar(15) not null,
--   email varchar(256) not null
-- )
--
-- /*
--  * 予約.
--  */
-- create table public.reservations (
--   id bigserial not null,
--   reservation_date date not null,
--   start_time time not null,
--   end_time not null,
--
--   store_id bigserial not null references public.stores(id) on delete cascade,
--   user_id bigserial not null references public.users(id) on delete cascade,
--   plan_id bigserial not null references public.plans(id) on delete cascade,
--   customer_id bigserial not null references public.customers(id) on delete cascade,
--
--   primary key (id)
-- )
