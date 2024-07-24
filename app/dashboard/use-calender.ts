import type { Database } from '@/types/supabase'
import {
  addHour,
  date,
  diffMinutes,
  isAfter,
  isBefore,
  sameHour,
  sameMinute,
} from '@formkit/tempo'
import { useMemo } from 'react'
import { generateHourlyIntervals } from './utils'

export function useCalendar(
  currentDate: Date,
  reservations: Database['public']['Tables']['reservations']['Row'][],
) {
  const times = useMemo(() => {
    return generateHourlyIntervals(
      addHour(currentDate, 7),
      addHour(currentDate, 22),
    )
  }, [currentDate])

  const getReservation = (target: Date) => {
    return reservations.filter((reservation) => {
      return (
        (sameHour(addHour(date(reservation.start_datetime), 9), target) &&
          sameMinute(addHour(date(reservation.start_datetime)), target)) ||
        (isAfter(target, addHour(date(reservation.start_datetime), 9)) &&
          isBefore(target, addHour(date(reservation.end_datetime), 9)))
      )
    })
  }

  const duringReservation = (
    target: Date,
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => {
    return (
      isAfter(target, addHour(date(reservation.start_datetime), 9)) &&
      isBefore(target, addHour(date(reservation.end_datetime), 9))
    )
  }

  // MEMO: レンダリングのタイミングによって効いたり効かなかったりする
  const getHeight = (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => {
    const diff = diffMinutes(
      date(reservation.end_datetime),
      date(reservation.start_datetime),
    )
    const n = 80 * (diff / 30)
    return `h-[${n}px]`
  }

  /*
   * Storeに設定したキャパシティに応じてグリッドのカラム数を決めます.
   */
  const getGridCols = (maxCapacity: number) => {
    return `grid-cols-${maxCapacity}`
  }

  return {
    times,
    getGridCols,
    getReservation,
    duringReservation,
    getHeight,
  }
}
