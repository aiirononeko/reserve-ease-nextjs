import { z } from 'zod'

export const storeSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  icon_url: z.string().url(),
  description: z.string().min(1).max(512),
  post_code: z.string().max(8),
  address: z.string().max(512),
  phone_number: z.string().min(1).max(15),
  max_capacity: z.string().min(1).max(1000),
})
