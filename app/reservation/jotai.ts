import type { Database } from '@/types/supabase'
import { atom } from 'jotai'

export const reservationAtom = atom({
  store: {} as Database['public']['Tables']['stores']['Row'],
  staff: {} as Database['public']['Tables']['users']['Row'],
  menu: {} as Database['public']['Tables']['menus']['Row'],
  customer: {} as Database['public']['Tables']['customers']['Row'],
  startDatetime: '',
})
