'use server'

import { createClient } from '@/lib/supabase/server'

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
    .eq('date', selectedDate.toISOString().split('T')[0])

  if (error) {
    console.error('Error fetching reservations:', error)
    return []
  }

  return data
}
