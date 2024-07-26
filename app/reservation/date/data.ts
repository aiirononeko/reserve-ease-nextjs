'use server'

import { createClient } from '@/lib/supabase/server'
import { dayEnd } from '@formkit/tempo'

export const getBusinessHours = async (storeId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', storeId)
  if (error) {
    throw error
  }

  return data
}

export const getReservations = async (storeId: number, selectedDate: Date) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('store_id', storeId)
    .gte('start_datetime', selectedDate.toISOString())
    .lte('end_datetime', dayEnd(selectedDate).toISOString())

  if (error) {
    console.error('Error fetching reservations:', error)
    return []
  }

  return data
}
