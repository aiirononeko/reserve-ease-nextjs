import { z } from 'zod'

export const businessHourSchema = z.object({
  id: z.number(),
  open_time: z.string(),
  close_time: z.string(),
  store_id: z.number(),
})
