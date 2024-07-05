'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getBusinessHours = async (user: AuthUser) => {
  const supabase = createClient()

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
    const { open_time, close_time } = parseNumrange(businessHour.open_period)
    return {
      id: businessHour.id,
      day_of_week: businessHour.day_of_week,
      open_time,
      close_time,
    }
  })
}

const parseNumrange = (
  numrange: string | null,
): { open_time: string; close_time: string } => {
  if (!numrange) return { open_time: '', close_time: '' }

  // 正規表現で数値部分を抽出
  const matches = numrange.match(/(\d+),(\d+)/)
  if (!matches || matches.length < 3) {
    throw new Error('Invalid numrange format')
  }

  // 数値部分を抽出して number 型に変換
  const start = parseInt(matches[1], 10)
  const end = parseInt(matches[2], 10)

  // HH:mm 形式の文字列に変換する関数
  const formatTime = (hours: number): string => {
    const h = hours % 24
    return `${h.toString().padStart(2, '0')}:00`
  }

  const open_time = formatTime(start)
  const close_time = formatTime(end)

  return { open_time, close_time }
}
