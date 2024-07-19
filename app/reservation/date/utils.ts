import type { Database } from '@/types/supabase'

export const getTimes = (
  businessHours: Database['public']['Tables']['business_hours']['Row'][],
  selectedDate: Date,
) => {
  const todaysBusinessHour = businessHours.find((businessHour) => {
    return businessHour.day_of_week === selectedDate.getDay()
  })

  return []

  // return generateBusinessHourStrings(openPeriod.openHour, openPeriod.closeHour)
}

const generateBusinessHourStrings = (
  openHour: number,
  closeHour: number,
): string[] => {
  const result: string[] = []
  for (let hour = openHour; hour < closeHour; hour++) {
    result.push(`${hour.toString().padStart(2, '0')}:00`)
    result.push(`${hour.toString().padStart(2, '0')}:30`)
  }
  return result
}

export const getDisabledTimes = (
  selectedDate: Date,
  maxReservationsPerSlot: number,
) => {
  return []
}
