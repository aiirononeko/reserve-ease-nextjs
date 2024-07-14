import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(1).max(100),
  phone_number: z.string().min(1).max(15),
  email: z.string().min(1).max(50),
  store_id: z.number(),
})
