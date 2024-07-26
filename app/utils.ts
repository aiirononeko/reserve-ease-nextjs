import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const checkUserRole = (user: AuthUser | null): string => {
  if (!user) return ''
  return user.user_metadata.role ?? ''
}

export const checkReservationDuplication = async (
  startDatetime: Date,
  endDatetime: Date,
  storeId: number,
) => {
  'use server'

  const supabase = createClient()

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .gte('start_datetime', startDatetime.toISOString())
    .lte('end_datetime', endDatetime.toISOString())
  if (error) {
    throw error
  }

  const capacity = await getStoreCapacity(storeId)

  if (data.length < capacity) {
    return true
  } else {
    return false
  }
}

const getStoreCapacity = async (storeId: number) => {
  'use server'

  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .select('max_capacity')
    .eq('id', storeId)
    .single()
  if (error) {
    throw error
  }

  return data.max_capacity
}
