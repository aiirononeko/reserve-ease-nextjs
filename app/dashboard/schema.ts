import { z } from 'zod'

export const createReservationSchema = z.object({
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  store_id: z.string(),
  user_id: z.string(),
  menu_id: z.string().optional(),
  customer_name: z.string().optional(),
  customer_phone_number: z.string().optional(),
  customer_email: z.string().optional(),
})

export const updateReservationSchema = z.object({
  id: z.number(),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
})

export const deleteReservationSchema = z.object({
  id: z.number(),
})
