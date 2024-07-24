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

  // TODO: TailwindCSSの設定いじって動的に生成できるようにする
  // MEMO: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  const getHeight = (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => {
    const diff = diffMinutes(
      date(reservation.end_datetime),
      date(reservation.start_datetime),
    )

    switch (diff / 30) {
      case 1:
        return 'h-[80px]'
      case 2:
        return 'h-[160px]'
      case 3:
        return 'h-[240px]'
      case 4:
        return 'h-[320px]'
      case 5:
        return 'h-[400px]'
      case 6:
        return 'h-[480px]'
      case 7:
        return 'h-[560px]'
      case 8:
        return 'h-[640px]'
      case 9:
        return 'h-[720px]'
      case 10:
        return 'h-[800px]'
      case 11:
        return 'h-[880px]'
      case 12:
        return 'h-[960px]'
      case 13:
        return 'h-[1040px]'
      case 14:
        return 'h-[1120px]'
      case 15:
        return 'h-[1200px]'
      case 16:
        return 'h-[1280px]'
      case 17:
        return 'h-[1360px]'
      case 18:
        return 'h-[1440px]'
      case 19:
        return 'h-[1520px]'
      case 20:
        return 'h-[1600px]'
      default:
        return 'h-[80px]'
    }
  }

  // TODO: TailwindCSSの設定いじって動的に生成できるようにする
  // MEMO: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  const getGridCols = (maxCapacity: number) => {
    switch (maxCapacity) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-3'
      case 4:
        return 'grid-cols-4'
      case 5:
        return 'grid-cols-5'
      case 6:
        return 'grid-cols-6'
      case 7:
        return 'grid-cols-7'
      case 8:
        return 'grid-cols-8'
      case 9:
        return 'grid-cols-9'
      case 10:
        return 'grid-cols-10'
      default:
        return 'grid-cols-1'
    }
  }

  return {
    times,
    getGridCols,
    getReservation,
    duringReservation,
    getHeight,
  }
}
