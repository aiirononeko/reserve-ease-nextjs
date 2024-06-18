import { z } from 'zod'

export const storeSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(512),
  post_code: z.string().min(1).max(8),
  address: z.string().min(1).max(512),
  phone_number: z.string().min(1).max(15),
})
