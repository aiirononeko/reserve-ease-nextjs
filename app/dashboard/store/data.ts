'use server'

import { createClient } from '@/lib/supabase/server'

export const getStore = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', user.user_metadata.store_id)
    .single()
  if (error) {
    throw error
  }

  return data
}
