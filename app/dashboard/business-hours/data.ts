'use server'

import { createClient } from '@/lib/supabase/server'

export const getBusinessHours = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', user.user_metadata.store_id)
    .order('day_of_week', { ascending: true })
  if (error) {
    throw error
  }

  return data
}
