'use server'

import { createClient } from '@/lib/supabase/server'

export const getAllStaff = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase
    .from('staffs')
    .select('*')
    .eq('store_id', user.user_metadata.store_id)
    .order('created_at', { ascending: true })
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
