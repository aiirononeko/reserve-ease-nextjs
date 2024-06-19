'use server'

import { getStoreIdFromUser } from '@/app/dashboard/data/user'
import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getBusinessHours = async (user: AuthUser) => {
  const supabase = createClient()

  const storeId = await getStoreIdFromUser(user.id)

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', storeId)
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
