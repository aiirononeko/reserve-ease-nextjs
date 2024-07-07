'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { storeSchema } from './schema'

export const updateStore = async (input: z.infer<typeof storeSchema>) => {
  const result = storeSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const supabase = createClient()

  const { error } = await supabase
    .from('stores')
    .update({
      ...input,
      max_capacity: Number(input.max_capacity),
    })
    .eq('id', input.id)
  if (error) {
    throw error
  }

  revalidatePath('/dashboard/store')
}
