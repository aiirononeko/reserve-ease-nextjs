'use server'

import { createClient } from '@/lib/supabase/server'
import { dayEnd } from '@formkit/tempo'

export const getReservations = async (targetDate: Date) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  console.log(`DEBUG: in server ${targetDate.toISOString()}`)

  const { data, error } = await supabase
    .from('reservations')
    .select(
      `
      *,
      menus:menu_id (
        name,
        minutes
      ),
      users:user_id (
        name
      ),
      customers:customer_id (
        name,
        phone_number,
        email
      )
    `,
    )
    .eq('store_id', user.user_metadata.store_id)
    .gte('start_datetime', targetDate.toISOString())
    .lt('start_datetime', dayEnd(targetDate).toISOString())
    .order('start_datetime', { ascending: true })
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

export const getStore = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
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
