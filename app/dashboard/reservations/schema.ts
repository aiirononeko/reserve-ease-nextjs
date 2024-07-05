import { z } from 'zod'

export const createReservationSchema = z.object({
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  store_id: z.string(),
  user_id: z.string(),
  customer_id: z.string().optional(),
  menu_id: z.string().optional(),
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
