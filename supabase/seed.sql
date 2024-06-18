insert into auth.users (id, email, encrypted_password, role)
values
  ('b2c88d43-249b-4c3e-8d45-54672b59de41', 'admin@gmail.com', crypt('password', gen_salt('bf')), 'admin');

insert into public.stores (name, address, phone_number, post_code) values
  ('東京ストア', '東京都中央区銀座1-1-1', '03-1234-5678', '104-0061'),
  ('大阪ストア', '大阪府北区梅田2-2-2', '06-2345-6789', '530-0001'),
  ('名古屋ストア', '愛知県名古屋市中村区名駅3-3-3', '052-3456-7890', '450-0002'),
  ('福岡ストア', '福岡県福岡市博多区博多駅東4-4-4', '092-4567-8901', '812-0011'),
  ('札幌ストア', '北海道札幌市中央区北五条西5-5-5', '011-5678-9012', '060-0005');

insert into public.roles (name) values
  ('admin'),
  ('owner'),
  ('staff');

insert into public.users (id, email, role_id, store_id) values
  ('b2c88d43-249b-4c3e-8d45-54672b59de41', 'admin@gmail.com', 1, 1);

insert into public.business_hours (day_of_week, open_time, close_time, store_id) values
  (0, '08:00', '18:00', 1), -- Sunday for store 1
  (1, '09:00', '19:00', 1), -- Monday for store 1
  (2, null, null, 1),       -- Tuesday for store 1 (closed)
  (3, '09:00', '19:00', 1), -- Wednesday for store 1
  (4, '09:00', '19:00', 1), -- Thursday for store 1
  (5, '09:00', '20:00', 1), -- Friday for store 1
  (6, '09:00', '20:00', 1), -- Saturday for store 1
  (0, '10:00', '16:00', 2), -- Sunday for store 2
  (1, '10:00', '18:00', 2), -- Monday for store 2
  (2, '10:00', '18:00', 2), -- Tuesday for store 2
  (3, '10:00', '18:00', 2), -- Wednesday for store 2
  (4, '10:00', '18:00', 2), -- Thursday for store 2
  (5, '10:00', '19:00', 2), -- Friday for store 2
  (6, '10:00', '19:00', 2), -- Saturday for store 2
  (0, null, null, 3),       -- Sunday for store 3 (closed)
  (1, '11:00', '17:00', 3), -- Monday for store 3
  (2, '11:00', '17:00', 3), -- Tuesday for store 3
  (3, '11:00', '17:00', 3), -- Wednesday for store 3
  (4, '11:00', '17:00', 3), -- Thursday for store 3
  (5, '11:00', '18:00', 3), -- Friday for store 3
  (6, '11:00', '18:00', 3); -- Saturday for store 3
