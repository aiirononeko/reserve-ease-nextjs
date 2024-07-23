'use server'

import { createClient } from '@/lib/supabase/server'
import { date, format } from '@formkit/tempo'
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

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  const customer = await createCustomer(
    input.customer_name,
    input.customer_phone_number,
    input.customer_email,
    user.user_metadata.store_id,
  )

  const reservationStartDatetime = date(input.start_datetime)
  const reservationEndDatetime = date(input.end_datetime)

  // MEMO: Local Timezone -> UTC
  const reservationDate = format({
    date: reservationStartDatetime.toISOString(),
    format: 'YYYY-MM-DD',
    tz: 'UTC',
  })
  const reservationStartTime = format({
    date: reservationStartDatetime.toISOString(),
    format: 'HH:mm',
    tz: 'UTC',
  })
  const reservationEndTime = format({
    date: reservationEndDatetime.toISOString(),
    format: 'HH:mm',
    tz: 'UTC',
  })

  const { error } = await supabase.from('reservations').insert({
    date: reservationDate,
    start_time: reservationStartTime + ':00',
    end_time: reservationEndTime + ':00',
    store_id: Number(input.store_id),
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

  const reservationStartDatetime = date(input.start_datetime)
  const reservationEndDatetime = date(input.end_datetime)

  // MEMO: Local Timezone -> UTC
  const reservationDate = format({
    date: reservationStartDatetime.toISOString(),
    format: 'YYYY-MM-DD',
    tz: 'UTC',
  })
  const reservationStartTime = format({
    date: reservationStartDatetime.toISOString(),
    format: 'HH:mm',
    tz: 'UTC',
  })
  const reservationEndTime = format({
    date: reservationEndDatetime.toISOString(),
    format: 'HH:mm',
    tz: 'UTC',
  })

  const { error } = await supabase
    .from('reservations')
    .update({
      date: reservationDate,
      start_time: reservationStartTime + ':00',
      end_time: reservationEndTime + ':00',
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
