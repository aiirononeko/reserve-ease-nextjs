import { z } from 'zod'

const businessHourSchema = z.object({
  id: z.number(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
})

export const businessHoursSchema = z.object({
  businessHours: z.array(businessHourSchema),
})
