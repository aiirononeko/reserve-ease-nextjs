import { z } from 'zod'

export const updateReservationSchema = z.object({
  id: z.number(),
  reservation_date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
})

export const deleteReservationSchema = z.object({
  id: z.number(),
})
