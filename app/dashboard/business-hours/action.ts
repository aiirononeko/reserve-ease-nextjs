'use server'

import { createClient } from '@/lib/supabase/server'
import type { z } from 'zod'
import { businessHoursSchema } from './schema'

export const updateBusinessHours = async (
  input: z.infer<typeof businessHoursSchema>,
) => {
  const result = businessHoursSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  input.businessHours.forEach(async (businessHour) => {
    const { error } = await supabase
      .from('business_hours')
      .update({ ...businessHour })
      .eq('id', businessHour.id)
    if (error) {
      console.error(error.message)
    }
  })
}
