import { createClient } from '@/lib/supabase/server'
import {
  addMinute,
  dayEnd,
  dayStart,
  diffMinutes,
  isAfter,
  isBefore,
  isEqual,
  tzDate,
} from '@formkit/tempo'
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

  // 対象の予約データを取得
  const reservations = await getReservations(
    reservationId,
    dayStart(startDatetime).toISOString(),
    dayEnd(endDatetime).toISOString(),
  )

  // 店舗のキャパシティを取得
  const capacity = await getStoreCapacity(storeId)

  // startDatetimeからendDatetimeまで30分刻みで予約データ数を確認
  const diff = diffMinutes(endDatetime, startDatetime)
  Array.from({ length: diff / 30 }).forEach((_, index) => {
    const targetDatetime = addMinute(startDatetime, index * 30)

    // 対象の時刻に存在する予約データを抽出
    const result = reservations.filter((reservation) => {
      const reservationStartDatetime = tzDate(reservation.start_datetime, 'UTC')
      const reservationEndDatetime = tzDate(reservation.end_datetime, 'UTC')

      const isEqualStartDatetime = isEqual(
        targetDatetime,
        reservationStartDatetime,
      )
      const isDuringReservationDatetime =
        isAfter(targetDatetime, reservationStartDatetime) &&
        isBefore(targetDatetime, reservationEndDatetime)

      return isEqualStartDatetime || isDuringReservationDatetime
    })

    // すでにcapacityに達している場合は登録不可とする
    if (result.length === capacity) {
      throw new Error(
        '予約がいっぱいです。作成日時を見直すか、店舗情報管理から最大予約数を増やしてください。',
      )
    }
  })
}

const getReservations = async (
  reservationId: number | undefined,
  startDatetime: string,
  endDatetime: string,
) => {
  'use server'

  const supabase = createClient()

  const query = reservationId
    ? supabase
        .from('reservations')
        .select('start_datetime, end_datetime')
        .neq('id', reservationId)
        .gte('start_datetime', startDatetime)
        .lte('end_datetime', endDatetime)
    : supabase
        .from('reservations')
        .select('start_datetime, end_datetime')
        .gte('start_datetime', startDatetime)
        .lte('end_datetime', endDatetime)

  const { data, error } = await query
  if (error) {
    throw error
  }

  return data
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
