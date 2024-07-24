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

  return user
}
