'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getAllStaff = async (user: AuthUser) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('store_id', user.user_metadata.store_id)
    .order('created_at', { ascending: true })
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
