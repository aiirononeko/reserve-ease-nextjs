import type { Database } from '@/types/supabase'
import { getReservations } from './data'

export const getTimes = (
  businessHours: Database['public']['Tables']['business_hours']['Row'][],
  selectedDate: Date,
) => {
  const todaysBusinessHour = businessHours.find((businessHour) => {
    return businessHour.day_of_week === selectedDate.getDay()
  })
  if (!todaysBusinessHour) return []

  return generateBusinessHourStrings(
    todaysBusinessHour.open_time,
    todaysBusinessHour.close_time,
  )
}

const generateBusinessHourStrings = (
  openTime: string | null,
  closeTime: string | null,
): string[] => {
  if (!openTime || !closeTime) return []
  const result: string[] = []

  const [openHour, openMinute] = openTime.split(':').map(Number)
  const [closeHour, closeMinute] = closeTime.split(':').map(Number)

  let currentHour = openHour
  let currentMinute = openMinute

  while (
    currentHour < closeHour ||
    (currentHour === closeHour && currentMinute < closeMinute)
  ) {
    result.push(
      `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`,
    )

    currentMinute += 30
    if (currentMinute >= 60) {
      currentHour++
      currentMinute = 0
    }
  }

  return result
}

export const getDisabledTimes = async (
  storeId: number,
  selectedDate: Date,
  maxReservationsPerSlot: number,
): Promise<string[]> => {
  const reservations = await getReservations(storeId, selectedDate)
  const reservationTimes: { [key: string]: number } = {}

  reservations.forEach((reservation) => {
    // TODO: 決めうちでJSTに変換しているため、offsetで計算するようにする
    const startHour = Number(reservation.start_time.split(':')[0]) + 9
    const startMinute = Number(reservation.start_time.split(':')[1])
    const endHour = Number(reservation.end_time.split(':')[0]) + 9
    const endMinute = Number(reservation.end_time.split(':')[1])

    // start から end までの各30分枠をカウント
    let currentHour = startHour
    let currentMinute = startMinute
    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const timeSlot = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
      reservationTimes[timeSlot] = (reservationTimes[timeSlot] || 0) + 1

      currentMinute += 30
      if (currentMinute >= 60) {
        currentHour++
        currentMinute = 0
      }
    }
  })

  const disabledTimes = Object.keys(reservationTimes).filter(
    (timeSlot) => reservationTimes[timeSlot] >= maxReservationsPerSlot,
  )
  return disabledTimes
}
