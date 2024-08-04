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
      .update({
        open_time:
          businessHour.open_time !== '' ? businessHour.open_time : null,
        close_time:
          businessHour.close_time !== '' ? businessHour.close_time : null,
      })
      .eq('id', businessHour.id)
    if (error) {
      console.error(error.message)
      throw error
    }
  })
}
