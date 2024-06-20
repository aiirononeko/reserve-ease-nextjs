'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { setPasswordSchema } from './schema'

export const setPassword = async (input: z.infer<typeof setPasswordSchema>) => {
  const result = setPasswordSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  await updatePassword(input.password)

  redirect('/dashboard')
}

const updatePassword = async (password: string) => {
  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    console.error(error.message)
  }
}
