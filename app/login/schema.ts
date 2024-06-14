import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'メールアドレスは有効な値ではありません' }),
  password: z.string().min(1).max(50),
})
