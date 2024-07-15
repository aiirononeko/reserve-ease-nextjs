'use server'

import { parseNumrange } from '@/app/utils'
import { createClient } from '@/lib/supabase/server'

export const getBusinessHours = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', user.user_metadata.store_id)
    .order('day_of_week', { ascending: true })
  if (error) {
    console.error(error.message)
    throw error
  }

  return data.map((businessHour) => {
    const openPeriod = parseNumrange(businessHour.open_period)
    const { open_time, close_time } = formatNumRange(
      openPeriod?.openHour,
      openPeriod?.closeHour,
    )
    return {
      id: businessHour.id,
      day_of_week: businessHour.day_of_week,
      open_time,
      close_time,
    }
  })
}

const formatNumRange = (
  openHour: number | undefined,
  closeHour: number | undefined,
): { open_time: string; close_time: string } => {
  if (!openHour || !closeHour) return { open_time: '', close_time: '' }
  // HH:mm 形式の文字列に変換する関数
  const formatTime = (hours: number): string => {
    const h = hours % 24
    return `${h.toString().padStart(2, '0')}:00`
  }

  const open_time = formatTime(openHour)
  const close_time = formatTime(closeHour)

  return { open_time, close_time }
}
