'use server'

import { createClient } from '@/lib/supabase/server'

export const getStores = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.from('stores').select('*')
  if (error) {
    console.error(error.message)
  }

  return data
}

export const getStoreOwner = async (storeId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('store_id', storeId)
    .single()
  if (error) {
    console.error(error)
  }

  return data
}
