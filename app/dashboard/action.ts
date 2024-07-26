'use server'

import { createClient } from '@/lib/supabase/server'
import { date } from '@formkit/tempo'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { checkReservationDuplication } from '../utils'
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

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  const startDatetime = date(input.start_datetime)
  const endDatetime = date(input.end_datetime)
  const storeId = Number(input.store_id)

  if (
    !(await checkReservationDuplication(startDatetime, endDatetime, storeId))
  ) {
    throw new Error('予約の時間が重複しています。別の時間を指定してください。')
  }

  const customer = await createCustomer(
    input.customer_name,
    input.customer_phone_number,
    input.customer_email,
    user.user_metadata.store_id,
  )

  const { error } = await supabase.from('reservations').insert({
    start_datetime: startDatetime.toISOString(),
    end_datetime: endDatetime.toISOString(),
    store_id: storeId,
    user_id: input.user_id,
    customer_id: customer ? customer.id : undefined,
    menu_id: input.menu_id ? Number(input.menu_id) : undefined,
  })
  if (error) {
    console.error(error.message)
    throw error
  }

  revalidatePath('/dashboard/reservations')
}

const createCustomer = async (
  name: string | undefined,
  phoneNumber: string | undefined,
  email: string | undefined,
  storeId: number,
) => {
  if (!name && phoneNumber && email) return

  const supabase = createClient()

  const { data, error } = await supabase
    .from('customers')
    .insert({
      name,
      email,
      phone_number: phoneNumber,
      store_id: storeId,
    })
    .select()
    .single()
  if (error) {
    throw error
  }

  return data
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

  const startDatetime = date(input.start_datetime)
  const endDatetime = date(input.end_datetime)
  const storeId = Number(input.store_id)

  if (
    !(await checkReservationDuplication(startDatetime, endDatetime, storeId))
  ) {
    throw new Error('予約の時間が重複しています。別の時間を指定してください。')
  }

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
