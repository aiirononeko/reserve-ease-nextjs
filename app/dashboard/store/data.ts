'use server'

import { getStoreIdFromUser } from '@/app/dashboard/data/user'
import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getStore = async (user: AuthUser) => {
  const supabase = createClient()

  const storeId = await getStoreIdFromUser(user.id)

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', storeId)
    .single()
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
