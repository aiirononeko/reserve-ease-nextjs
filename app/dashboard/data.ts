'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'

export const getReservations = async (user: AuthUser) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reservations')
    .select(
      `
      *,
      menus:menu_id (
        name
      ),
      users:user_id (
        name
      ),
      customers:customer_id (
        name
      )
    `,
    )
    .eq('store_id', user.user_metadata.store_id)
    .order('created_at', { ascending: false })
  if (error) {
    console.error(error.message)
    throw error
  }

  return data.map((reservation) => {
    const { date, start_time, end_time } = parseTstzrange(
      reservation.reservation_period,
    )

    return {
      id: reservation.id,
      menus: reservation.menus,
      customers: reservation.customers,
      users: reservation.users,
      date,
      start_time,
      end_time,
    }
  })
}

const parseTstzrange = (
  tstzrange: string,
): { date: string; start_time: string; end_time: string } => {
  // 正規表現で日付と時刻部分を抽出
  const pattern =
    /\["(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\+\d{2}","(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\+\d{2}"\)/
  const matches = tstzrange.match(pattern)

  if (!matches || matches.length < 5) {
    throw new Error('Invalid tstzrange format')
  }

  // 日付と時刻部分を抽出
  const date = matches[1]
  const start_time = matches[2]
  const end_time = matches[4] // matches[4]で終了時刻を正しく抽出

  return { date, start_time, end_time }
}