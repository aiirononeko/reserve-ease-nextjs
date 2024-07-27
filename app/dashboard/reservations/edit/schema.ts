import { z } from 'zod'

export const updateReservationSchema = z.object({
  id: z.number(),
  start_datetime: z.string(),
  end_datetime: z.string(),
  store_id: z.string(),
})
