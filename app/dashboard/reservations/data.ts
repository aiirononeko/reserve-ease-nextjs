'use server'

import { createClient } from '@/lib/supabase/server'
import { dayEnd, dayStart, tzDate } from '@formkit/tempo'

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
    .gte(
      'start_datetime',
      dayStart(tzDate(new Date(), 'Asia/Tokyo')).toISOString(),
    ) // TODO:
    .lt(
      'start_datetime',
      dayEnd(tzDate(new Date(), 'Asia/Tokyo')).toISOString(),
    ) // TODO:
    .order('start_datetime', { ascending: true })
  if (error) {
    throw error
  }

  console.log(
    `DEBUG3: ${dayStart(tzDate(new Date(), 'Asia/Tokyo')).toISOString()}`,
  )
  console.log(
    `DEBUG4: ${dayEnd(tzDate(new Date(), 'Asia/Tokyo')).toISOString()}`,
  )

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
