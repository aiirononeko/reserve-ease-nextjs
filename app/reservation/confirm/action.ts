'use server'

import { createClient } from '@/lib/supabase/server'
import { addMinute, date, format } from '@formkit/tempo'
import type { ExtractAtomValue } from 'jotai'
import type { reservationAtom } from '../jotai'

export const createReservation = async (
  input: ExtractAtomValue<typeof reservationAtom>,
) => {
  const supabase = createClient()

  const reservationDate = format({
    date: date(input.startDatetime),
    format: 'YYYY-MM-DD',
    tz: 'UTC',
  })
  const reservationStartTime = format({
    date: date(input.startDatetime),
    format: 'HH:mm',
    tz: 'UTC',
  })
  const reservationEndTime = format({
    date: addMinute(date(input.startDatetime), input.menu.minutes),
    format: 'HH:mm',
    tz: 'UTC',
  })

  const { error } = await supabase.from('reservations').insert({
    date: reservationDate,
    start_time: reservationStartTime,
    end_time: reservationEndTime,
    store_id: input.store.id,
    user_id: input.staff.id,
    customer_id: input.customer.id,
    menu_id: input.menu.id,
  })
  if (error) {
    throw error
  }
}
