import { parseNumrange } from '@/app/utils'
import type { Database } from '@/types/supabase'

export const getTimes = (
  businessHours: Database['public']['Tables']['business_hours']['Row'][],
  selectedDate: Date,
) => {
  const todaysBusinessHour = businessHours.filter((businessHour) => {
    return businessHour.day_of_week === selectedDate.getDay()
  })

  const openPeriod = parseNumrange(todaysBusinessHour[0].open_period)
  if (!openPeriod) return []

  return generateBusinessHourString(openPeriod.openHour, openPeriod.closeHour)
}

const generateBusinessHourString = (
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

export const getDisabledTimes = () => {
  return ['11:30', '12:00', '14:30']
}
