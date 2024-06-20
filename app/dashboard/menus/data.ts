'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getMenus = async (user: AuthUser) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
  if (error) {
    console.error(error)
  }

  return data
}
