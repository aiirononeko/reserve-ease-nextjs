'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getReservations = async (user: AuthUser) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reservations')
    .select(
      `
      *,
      menus:menu_id (
        name
      ),
      users:user_id (
        name
      )
    `,
    )
    .eq('store_id', user.user_metadata.store_id)
    .order('created_at', { ascending: false })
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
