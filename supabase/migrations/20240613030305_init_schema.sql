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
  max_capacity int not null default 1,
  icon_url varchar(256),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  primary key (id)
);

/*
 * ユーザー.
 */
create table public.users (
  id uuid not null references auth.users on delete cascade,
  email varchar(256) not null unique,
  name varchar(50),
  profile varchar(512),
  icon_url varchar(512),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  store_id bigserial not null references public.stores(id) on delete cascade,

  primary key (id)
);

/*
 * メニュー.
 */
create table public.menus (
  id bigserial not null,
  name varchar(15) not null,
  description varchar(512) not null,
  amount int not null,
  discount int not null default 0,
  minutes int not null default 0, -- 30分刻み
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  user_id uuid not null references public.users(id) on delete cascade,

  primary key (id)
);

/*
 * 営業時間.
 */
create table public.business_hours (
  id bigserial not null,
  day_of_week int not null, -- 0 = Sunday, 1 = Monday, 2 = Tuesday ... 6 = Saturday
  open_time time,
  close_time time,

  store_id bigserial not null references public.stores(id) on delete cascade,

  primary key (id)
);

/**
 * 顧客.
 */
create table public.customers (
  id bigserial not null,
  name varchar(50),
  email varchar(257),
  phone_number varchar(16),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  store_id bigserial not null references public.stores(id) on delete cascade,

  primary key (id)
);

/*
 * 予約.
 */
create table public.reservations (
  id bigserial not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  store_id bigserial not null references public.stores(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  customer_id bigserial references public.customers(id) on delete cascade,
  menu_id bigserial references public.menus(id) on delete cascade,

  primary key (id)
);
