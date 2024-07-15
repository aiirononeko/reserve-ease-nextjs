import { z } from 'zod'

export const createMenuSchema = z.object({
  name: z.string().min(1).max(15),
  description: z.string().min(1).max(512),
  amount: z.string(),
  discount: z.string(),
  minutes: z.string(),
  user_id: z.string().min(1),
})
