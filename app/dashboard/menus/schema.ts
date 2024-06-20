import { z } from 'zod'

export const updateMenuSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(15),
  description: z.string().min(1).max(512),
  amount: z.string(),
  discount: z.string(),
})

export const deleteMenuSchema = z.object({
  id: z.number(),
})
