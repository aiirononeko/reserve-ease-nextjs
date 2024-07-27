'use server'

import { createClient } from '@/lib/supabase/server'

export const getReservation = async (reservationId: number) => {
  const supabase = createClient()

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
    .eq('id', reservationId)
    .single()
  if (error) {
    throw error
  }

  return data
}
