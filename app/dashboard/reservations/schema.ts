import { z } from 'zod'

export const createReservationSchema = z.object({
  start_datetime: z.string(),
  end_datetime: z.string(),
  store_id: z.string(),
  user_id: z.string(),
  menu_id: z.string(),
  customer_name: z.string().optional(),
  customer_phone_number: z.string().optional(),
  customer_email: z.string().optional(),
})

export const updateReservationSchema = z.object({
  id: z.number(),
  start_datetime: z.string(),
  end_datetime: z.string(),
  store_id: z.string(),
})

export const deleteReservationSchema = z.object({
  id: z.string(),
})
