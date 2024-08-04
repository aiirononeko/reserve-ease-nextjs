import type { Database } from '@/types/supabase'
import { addHour, date, format } from '@formkit/tempo'
import { getReservations } from './data'

// TODO: JSTしか考慮した作りになっているため、国際化対応する
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

// TODO: JSTしか考慮した作りになっているため、国際化対応する
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

// TODO: JSTしか考慮した作りになっているため、国際化対応する
export const getDisabledTimes = async (
  storeId: number,
  selectedDate: Date,
  maxReservationsPerSlot: number,
): Promise<string[]> => {
  const reservations = await getReservations(storeId, selectedDate)
  const reservationTimes: { [key: string]: number } = {}

  reservations.forEach((reservation) => {
    const startDatetime = addHour(date(reservation.start_datetime), 9)
    const endDatetime = addHour(date(reservation.end_datetime), 9)

    const startHour = Number(format(startDatetime, 'HH'))
    const startMinute = Number(format(startDatetime, 'mm'))
    const endHour = Number(format(endDatetime, 'HH'))
    const endMinute = Number(format(endDatetime, 'mm'))

    console.log('--------startDatetime, endDatetime-------------')
    console.log(startDatetime, endDatetime)
    console.log('------------------------------------------------')
    console.log(
      '--------startHour, startMinute, endHour, endMinute-------------',
    )
    console.log(startHour, startMinute, endHour, endMinute)
    console.log('------------------------------------------------')

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

  console.log('-------------------reservationTimes---------------')
  console.log(reservationTimes)
  console.log('------------------------------------------------')

  const disabledTimes = Object.keys(reservationTimes).filter(
    (timeSlot) => reservationTimes[timeSlot] >= maxReservationsPerSlot,
  )
  console.log(disabledTimes)
  return disabledTimes
}
