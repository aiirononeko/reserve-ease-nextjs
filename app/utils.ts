import { createClient } from '@/lib/supabase/server'
import { isAfter, isBefore, isEqual, tzDate } from '@formkit/tempo'
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
  reservationId?: number,
) => {
  'use server'

  // 開始日時が終了日時よりも先かどうかチェック
  if (!isBefore(startDatetime, endDatetime)) {
    console.error('開始日時は終了日時より先の時刻を指定してください')
    return false
  }

  const supabase = createClient()

  // 更新の場合は対象の予約を取得
  const query = reservationId
    ? supabase
        .from('reservations')
        .select('start_datetime, end_datetime')
        .neq('id', reservationId)
    : supabase.from('reservations').select('start_datetime, end_datetime')

  const { data, error } = await query
  if (error) {
    throw error
  }

  const result = data.filter((reservation) => {
    const reservationStart = tzDate(reservation.start_datetime, 'UTC')
    const reservationEnd = tzDate(reservation.end_datetime, 'UTC')

    // 予約の開始時刻が指定範囲内にある場合
    const startInRange =
      (isEqual(reservationStart, startDatetime) ||
        isAfter(reservationStart, startDatetime)) &&
      isBefore(reservationStart, endDatetime)

    // 予約の終了時刻が指定範囲内にある場合
    const endInRange =
      (isEqual(reservationEnd, endDatetime) ||
        isBefore(reservationEnd, endDatetime)) &&
      isAfter(reservationEnd, startDatetime)

    // 予約が指定範囲を完全に包含する場合
    const reservationContainsRange =
      isBefore(reservationStart, startDatetime) &&
      isAfter(reservationEnd, endDatetime)

    return startInRange || endInRange || reservationContainsRange
  })

  const capacity = await getStoreCapacity(storeId)

  // 同じ時刻の総予約数が店舗のキャパシティを上回らないかチェック
  if (result.length < capacity) {
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
