'use server'

import { createClient } from '@/lib/supabase/server'

export const getMenus = async (staffId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('user_id', staffId)
    .order('updated_at', { ascending: false })
  if (error) {
    throw error
  }

  return data
}
