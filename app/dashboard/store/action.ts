'use server'

import { supabase } from '@/lib/supabase'
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

  const { error } = await supabase
    .from('stores')
    .update({ ...input })
    .eq('id', input.id)
  if (error) {
    console.error(error)
  }

  revalidatePath('/dashboard/store')
}
