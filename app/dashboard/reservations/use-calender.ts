import type { Database } from '@/types/supabase'
import {
  addHour,
  date,
  diffMinutes,
  isAfter,
  isBefore,
  isEqual,
  tzDate,
} from '@formkit/tempo'
import { useMemo } from 'react'
import { generateHourlyIntervals } from './utils'

export function useCalendar(
  currentDate: Date,
  businessHours: Database['public']['Tables']['business_hours']['Row'][],
  reservations: Database['public']['Tables']['reservations']['Row'][],
) {
  const times = useMemo(() => {
    const todaysBusinessHour = businessHours.find((businessHour) => {
      return businessHour.day_of_week === currentDate.getDay()
    })

    if (!todaysBusinessHour?.open_time || !todaysBusinessHour?.close_time) {
      return []
    }

    const openHour = extractHour(todaysBusinessHour?.open_time)
    const closeHour = extractHour(todaysBusinessHour?.close_time)

    return generateHourlyIntervals(
      addHour(currentDate, openHour),
      addHour(currentDate, closeHour),
    )
  }, [currentDate])

  function extractHour(timeString: string): number {
    const match = timeString.match(/^(\d{1,2}):/)
    if (match) {
      return parseInt(match[1], 10)
    }
    throw new Error('Invalid time format')
  }

  const filteringReservations = (targetDatetime: Date) => {
    return reservations.filter((reservation) => {
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
  }

  const filteringDuringReservations = (targetDatetime: Date) => {
    return reservations.filter((reservation) => {
      const reservationStartDatetime = addHour(
        date(reservation.start_datetime),
        9,
      ) // TODO:
      const reservationEndDatetime = addHour(date(reservation.end_datetime), 9) // TODO:

      return (
        isAfter(targetDatetime, reservationStartDatetime) &&
        isBefore(targetDatetime, reservationEndDatetime)
      )
    })
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
    filteringReservations,
    filteringDuringReservations,
    getHeight,
  }
}
