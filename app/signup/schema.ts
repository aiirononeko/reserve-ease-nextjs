import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1).max(50),
  email: z
    .string()
    .email({ message: 'メールアドレスは有効な値ではありません' }),
  storeName: z.string().min(1).max(100),
  password: z.string().min(1).max(50),
})
