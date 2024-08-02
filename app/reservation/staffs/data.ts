'use server'

import { createClient } from '@/lib/supabase/server'

export const getStaffs = async (storeId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('staffs')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: true })
  if (error) {
    throw error
  }

  return data
}
