import { z } from 'zod'

export const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  icon_url: z.string().url(),
  profile: z.string().min(1).max(1024),
})
