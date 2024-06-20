'use server'

import { createClient } from '@/lib/supabase/server'

export const getStoreIdFromUser = async (uid: string): Promise<number> => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('store_id')
    .eq('id', uid)
    .single()
  if (error) {
    console.log(error.message)
    throw error
  }

  return data.store_id
}
