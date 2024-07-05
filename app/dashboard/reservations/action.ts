'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { createReservationSchema, updateReservationSchema } from './schema'

export const createReservation = async (
  input: z.infer<typeof createReservationSchema>,
) => {
  const result = createReservationSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const reservation_period = generateTstzrange(
    input.date,
    input.start_time,
    input.end_time,
  )
  const { error } = await supabase.from('reservations').insert({
    reservation_period,
    store_id: Number(input.store_id),
    user_id: input.user_id,
    customer_id: input.customer_id ? Number(input.customer_id) : undefined,
    menu_id: input.menu_id ? Number(input.menu_id) : undefined,
  })
  if (error) {
    console.error(error.message)
    throw error
  }

  revalidatePath('/dashboard/reservations')
}

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

  const reservation_period = generateTstzrange(
    input.date,
    input.start_time,
    input.end_time,
  )
  const { error } = await supabase
    .from('reservations')
    .update({
      reservation_period,
    })
    .eq('id', input.id)
  if (error) {
    console.error(error.message)
    throw error
  }

  revalidatePath('/dashboard/reservations')
}

export const deleteReservation = async (reservationId: number) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId)
  if (error) {
    console.error(error.message)
    throw error
  }

  revalidatePath('/dashboard/reservations')
}

const generateTstzrange = (
  date: string,
  open_time: string,
  close_time: string,
  timezone: string = '+00',
): string => {
  // 正規表現で時刻形式をチェック
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  if (!timeRegex.test(open_time) || !timeRegex.test(close_time)) {
    throw new Error('Invalid time format. Expected HH:MM format.')
  }

  // tstzrange形式の文字列を生成
  return `["${date} ${open_time}:00${timezone}","${date} ${close_time}:00${timezone}")`
}
