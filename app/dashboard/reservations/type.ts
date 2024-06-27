import type { Database } from '@/types/supabase'

export type ReservationType =
  Database['public']['Tables']['reservations']['Row'] & {
    menus: { name: string }
    users: { name: string }
  }
