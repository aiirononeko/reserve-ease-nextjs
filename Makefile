start:
	npx supabase start
	npm run dev

stop:
	npx supabase stop

db-reset:
	npx supabase db reset
	npx supabase gen types typescript --local > types/supabase.ts

test:
	npm run test
