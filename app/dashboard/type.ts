import type { Database } from '@/types/supabase'

export type Reservation = Database['public']['Tables']['reservations']['Row']
