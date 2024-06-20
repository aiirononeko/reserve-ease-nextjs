import { z } from 'zod'

export const storeSchema = z.object({
  storeName: z.string(),
  ownerEmail: z.string(),
})
