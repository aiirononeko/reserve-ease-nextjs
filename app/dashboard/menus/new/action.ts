'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { createMenuSchema } from './schema'

export const createMenu = async (input: z.infer<typeof createMenuSchema>) => {
  const result = createMenuSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const { error } = await supabase.from('menus').insert({
    ...input,
    amount: Number(input.amount),
    discount: Number(input.discount),
  })
  if (error) {
    console.error(error.message)
  }

  revalidatePath('/dashboard/menus')
  redirect('/dashboard/menus')
}
