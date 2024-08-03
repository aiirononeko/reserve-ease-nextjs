'use server'

import { createClient } from '@/lib/supabase/server'

export const getMenus = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('staff_id', user.id)
    .order('updated_at', { ascending: false })
  if (error) {
    console.error(error)
  }

  return data
}
