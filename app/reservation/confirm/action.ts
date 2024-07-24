'use server'

import { createClient } from '@/lib/supabase/server'
import { addMinute, date } from '@formkit/tempo'
import type { ExtractAtomValue } from 'jotai'
import type { reservationAtom } from '../jotai'

export const createReservation = async (
  input: ExtractAtomValue<typeof reservationAtom>,
) => {
  const supabase = createClient()

  const { error } = await supabase.from('reservations').insert({
    start_datetime: date(input.startDatetime).toISOString(),
    end_datetime: addMinute(
      date(input.startDatetime),
      input.menu.minutes,
    ).toISOString(),
    store_id: input.store.id,
    user_id: input.staff.id,
    customer_id: input.customer.id,
    menu_id: input.menu.id,
  })
  if (error) {
    throw error
  }
}
