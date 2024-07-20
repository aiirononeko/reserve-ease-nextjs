'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { deleteMenuSchema, updateMenuSchema } from './schema'

export const updateMenu = async (input: z.infer<typeof updateMenuSchema>) => {
  const result = updateMenuSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const { error } = await supabase
    .from('menus')
    .update({
      ...input,
      amount: Number(input.amount),
      discount: Number(input.discount),
      minutes: Number(input.minutes),
    })
    .eq('id', input.id)
  if (error) {
    console.error(error.message)
  }

  revalidatePath('/dashboard/menus')
}

export const deleteMenu = async (input: z.infer<typeof deleteMenuSchema>) => {
  const result = deleteMenuSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const { error } = await supabase.from('menus').delete().eq('id', input.id)
  if (error) {
    console.error(error.message)
  }

  revalidatePath('/dashboard/menus')
  redirect('/dashboard/menus')
}
