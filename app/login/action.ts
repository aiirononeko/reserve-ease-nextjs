'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { loginSchema } from './schema'

export const login = async (input: z.infer<typeof loginSchema>) => {
  const result = loginSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ ...input })
  if (error) {
    console.error(error.message)
    throw error
  }

  redirect('/dashboard')
}
