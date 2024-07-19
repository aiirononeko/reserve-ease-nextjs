import type { Database } from '@/types/supabase'

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

export const getDisabledTimes = (
  selectedDate: Date,
  maxReservationsPerSlot: number,
) => {
  return []
}
