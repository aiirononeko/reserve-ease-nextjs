'use server'

import { createClient } from '@/lib/supabase/server'
import { date, dayEnd, dayStart } from '@formkit/tempo'

export const getReservations = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  const { data, error } = await supabase
    .from('reservations')
    .select(
      `
      *,
      menus:menu_id (
        *
      ),
      users:user_id (
        *
      ),
      customers:customer_id (
        *
      )
    `,
    )
    .eq('store_id', user.user_metadata.store_id)
    .gte('start_datetime', dayStart(date()).toISOString())
    .lt('start_datetime', dayEnd(date()).toISOString())
    .order('created_at', { ascending: false })
  if (error) {
    throw error
  }

  return data
}

export const getMenus = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('user_id', user.id)
  if (error) {
    throw error
  }

  return data
}
