import { z } from 'zod'

export const inviteStaffSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(1).max(50),
  store_id: z.string().min(1),
})
