import { z } from 'zod'

export const ownerInvitationSchema = z.object({
  owner_email: z.string().min(1),
  store_name: z.string().min(1),
  role_id: z.number(),
})
