'use server'

import { checkReservationDuplication } from '@/app/utils'
import { createClient } from '@/lib/supabase/server'
import { addMinute, date } from '@formkit/tempo'
import type { ExtractAtomValue } from 'jotai'
import type { reservationAtom } from '../jotai'

export const createReservation = async (
  input: ExtractAtomValue<typeof reservationAtom>,
) => {
  const supabase = createClient()

  const startDatetime = date(input.startDatetime)
  const endDatetime = addMinute(date(input.startDatetime), input.menu.minutes)
  const storeId = input.store.id

  if (
    !(await checkReservationDuplication(startDatetime, endDatetime, storeId))
  ) {
    throw new Error('予約できる時間帯ではありません')
  }

  const { error } = await supabase.from('reservations').insert({
    start_datetime: startDatetime.toISOString(),
    end_datetime: endDatetime.toISOString(),
    store_id: input.store.id,
    staff_id: input.staff.id,
    customer_id: input.customer.id,
    menu_id: input.menu.id,
  })
  if (error) {
    throw error
  }
}
