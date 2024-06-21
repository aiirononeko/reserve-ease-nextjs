'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getBusinessHours = async (user: AuthUser) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', user.user_metadata.store_id)
    .order('day_of_week', { ascending: true })
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
