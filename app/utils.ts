import { createClient } from '@/lib/supabase/server'
import { isBefore } from '@formkit/tempo'
import type { AuthUser } from '@supabase/supabase-js'

export const checkUserRole = (user: AuthUser | null): string => {
  if (!user) return ''
  return user.user_metadata.role ?? ''
}

/*
 * 作成しようとしている予約データの有効性を確認
 */
export const checkReservationDuplication = async (
  startDatetime: Date,
  endDatetime: Date,
  storeId: number,
) => {
  'use server'

  // 開始日時が終了日時よりも先かどうかチェック
  if (!isBefore(startDatetime, endDatetime)) {
    console.error('開始日時は終了日時より先の時刻を指定してください')
    return false
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .gte('start_datetime', startDatetime.toISOString())
    .lte('end_datetime', endDatetime.toISOString())
  if (error) {
    throw error
  }

  const capacity = await getStoreCapacity(storeId)

  // 同じ時刻の総予約数が店舗のキャパシティを上回らないかチェック
  if (data.length < capacity) {
    return true
  } else {
    return false
  }
}

const getStoreCapacity = async (storeId: number) => {
  'use server'

  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .select('max_capacity')
    .eq('id', storeId)
    .single()
  if (error) {
    throw error
  }

  return data.max_capacity
}
