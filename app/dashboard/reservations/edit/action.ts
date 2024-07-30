'use server'

import { checkReservationDuplication } from '@/app/utils'
import { createClient } from '@/lib/supabase/server'
import { date } from '@formkit/tempo'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { updateReservationSchema } from './schema'

export const updateReservation = async (
  input: z.infer<typeof updateReservationSchema>,
) => {
  const result = updateReservationSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const startDatetime = date(input.start_datetime)
  const endDatetime = date(input.end_datetime)
  const storeId = Number(input.store_id)

  // 更新後の時間で予約が重複していないか確認
  await checkReservationDuplication(
    startDatetime,
    endDatetime,
    storeId,
    input.id,
  )

  const { error } = await supabase
    .from('reservations')
    .update({
      start_datetime: startDatetime.toISOString(),
      end_datetime: endDatetime.toISOString(),
    })
    .eq('id', input.id)
  if (error) {
    console.error(error.message)
    throw error
  }

  revalidatePath('/dashboard/reservations')
}
