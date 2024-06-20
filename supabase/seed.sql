WITH credentials(id, mail, pass) AS (
  SELECT * FROM (VALUES 
    ('123e4567-e89b-12d3-a456-426614174000', 'user1@example.com', 'password'), 
    ('123e4567-e89b-12d3-a456-426614174001', 'user2@example.com', 'password'), 
    ('123e4567-e89b-12d3-a456-426614174002', 'user3@example.com', 'password'), 
    ('123e4567-e89b-12d3-a456-426614174003', 'test@example.com', 'password'), 
    ('123e4567-e89b-12d3-a456-426614174004', 'user5@example.com', 'password')
  ) AS users(id, mail, pass)
),
create_user AS (
  INSERT INTO auth.users (id, instance_id, ROLE, aud, email, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, created_at, updated_at, last_sign_in_at, email_confirmed_at, confirmation_sent_at, confirmation_token, recovery_token, email_change_token_new, email_change)
    SELECT id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', mail, '{"provider":"email","providers":["email"]}', '{"role":"owner", "store_id":1}', FALSE, crypt(pass, gen_salt('bf')), NOW(), NOW(), NOW(), NOW(), NOW(), '', '', '', '' FROM credentials
  RETURNING id
)

INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  SELECT gen_random_uuid(), id, id, json_build_object('sub', id), 'email', NOW(), NOW(), NOW() FROM create_user;

INSERT INTO public.stores (name, address, phone_number, post_code) VALUES
  ('東京ストア', '東京都中央区銀座1-1-1', '03-1234-5678', '104-0061'),
  ('大阪ストア', '大阪府北区梅田2-2-2', '06-2345-6789', '530-0001'),
  ('名古屋ストア', '愛知県名古屋市中村区名駅3-3-3', '052-3456-7890', '450-0002'),
  ('福岡ストア', '福岡県福岡市博多区博多駅東4-4-4', '092-4567-8901', '812-0011'),
  ('札幌ストア', '北海道札幌市中央区北五条西5-5-5', '011-5678-9012', '060-0005');

INSERT INTO public.users (id, email, name, profile) VALUES
  ('123e4567-e89b-12d3-a456-426614174000', 'user1@example.com', '石橋ネオ', '美容師。10年以上の経験を持つ。'),
  ('123e4567-e89b-12d3-a456-426614174001', 'user2@example.com', '梅村祐樹', '整体師。専門はスポーツマッサージ。'),
  ('123e4567-e89b-12d3-a456-426614174002', 'user3@example.com', '大門しゅう', '美容院経営者。最新のトレンドに精通。'),
  ('123e4567-e89b-12d3-a456-426614174003', 'test@example.com', '片田凌太', '美容院経営者。最新のトレンドに精通。'),
  ('123e4567-e89b-12d3-a456-426614174004', 'user5@example.com', '庄司隼人', '美容院経営者。最新のトレンドに精通。');

INSERT INTO public.menus (name, description, amount, discount, user_id) VALUES
  ('カット', 'お客様のご希望に合わせたプロフェッショナルなカットです。', 3000, 200, '123e4567-e89b-12d3-a456-426614174003'),
  ('全身マッサージ', 'ストレスと緊張を解消するリラクゼーションマッサージです。', 6000, 500, '123e4567-e89b-12d3-a456-426614174003'),
  ('フェイシャル', '肌を輝かせるリジュベネーションフェイシャルトリートメントです。', 4500, 300, '123e4567-e89b-12d3-a456-426614174003'),
  ('ヘアカラー', 'イメージチェンジに最適なプロのヘアカラーリングサービスです。', 7000, 0, '123e4567-e89b-12d3-a456-426614174003'),
  ('カイロプラクティック', '姿勢を整え、痛みを軽減する脊椎調整です。', 5000, 400, '123e4567-e89b-12d3-a456-426614174003');

INSERT INTO public.business_hours (day_of_week, open_time, close_time, store_id) VALUES
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
