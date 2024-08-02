'use server'

import { createClient } from '@/lib/supabase/server'

export const getUser = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  const { data, error } = await supabase
    .from('staffs')
    .select('*')
    .eq('id', user.id)
    .single()
  if (error) {
    throw error
  }

  return data
}
