'use server'

import { createClient } from '@/lib/supabase/server'

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
        name
      ),
      users:user_id (
        name
      ),
      customers:customer_id (
        name
      )
    `,
    )
    .eq('store_id', user.user_metadata.store_id)
    .order('created_at', { ascending: false })
  if (error) {
    throw error
  }

  return {
    user,
    reservations: data.map((reservation) => {
      return {
        id: reservation.id,
        menus: reservation.menus,
        customers: reservation.customers,
        users: reservation.users,
        date: reservation.date,
        start_time: reservation.start_time,
        end_time: reservation.end_time,
      }
    }),
  }
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
