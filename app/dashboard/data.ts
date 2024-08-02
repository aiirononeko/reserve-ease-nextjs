'use server'

import { createClient } from '@/lib/supabase/server'

export const getRecentReservation = async () => {
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
      'start_datetime, end_datetime, menus:menu_id (name), customers:customer_id (name)',
    )
    .eq('user_id', user.id)
    .gte('start_datetime', new Date().toISOString())
    .order('start_datetime', { ascending: true })
    .limit(1)
    .single()
  if (error) {
    return undefined
  }

  return data
}

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
