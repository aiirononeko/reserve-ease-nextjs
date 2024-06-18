'use server'

import { createClient } from '@/lib/supabase/server'

export const getStore = async () => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) {
    console.error(error.message)
  }

  return data
}

export const getBusinessHours = async (storeId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', storeId)
  if (error) {
    console.error(error.message)
  }

  return data
}
