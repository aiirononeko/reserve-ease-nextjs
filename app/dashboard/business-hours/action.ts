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
    const open_period = generateOpenPeriod(
      businessHour.open_time,
      businessHour.close_time,
    )
    console.log(open_period)

    const { error } = await supabase
      .from('business_hours')
      .update({ open_period })
      .eq('id', businessHour.id)
    if (error) {
      console.error(error.message)
      throw error
    }
  })
}

const generateOpenPeriod = (
  open_time: string | undefined,
  close_time: string | undefined,
): string | null => {
  if (!open_time || !close_time) return null

  // 正規表現で時刻形式をチェック
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

  if (!timeRegex.test(open_time) || !timeRegex.test(close_time)) {
    throw new Error('Invalid time format. Expected HH:MM format.')
  }

  // 時間部分を数値に変換
  const [openHour] = open_time.split(':').map(Number)
  const [closeHour] = close_time.split(':').map(Number)

  // numrange形式の文字列を生成
  return `[${openHour},${closeHour})`
}
