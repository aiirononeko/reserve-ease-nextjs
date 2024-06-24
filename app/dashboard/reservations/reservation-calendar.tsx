'use client'

import type { Database } from '@/types/supabase'
import { useState } from 'react'
import { ReservationCalendarHeader } from './reservation-calendar-header'

interface Props {
  reservations: Database['public']['Tables']['reservations']['Row'][]
}

export const ReservationCalendar = ({ reservations }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [reservationsState] = useState(reservations)

  const getWeekDates = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start)
      date.setDate(date.getDate() + i)
      return date
    })
  }

  const getCurrentTimePosition = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    return (hours + minutes / 60) * 56 // 1時間の高さが56px
  }

  const weekDates = getWeekDates()
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className='w-full'>
      <ReservationCalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        weekDates={weekDates}
      />
      <div className='flex overflow-x-auto'>
        <div className='sticky left-0 z-10'>
          <div className='h-10 w-16'></div>
          {hours.map((hour) => (
            <div
              key={hour}
              className='flex h-14 w-16 items-start justify-start text-sm text-gray-500'
            >
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
        <div className='grow'>
          <div className='grid grid-cols-7'>
            {weekDates.map((date, dateIndex) => (
              <div key={dateIndex}>
                <div className='sticky top-0 z-10 border-b border-gray-200 p-2 text-center'>
                  <div className='text-sm font-bold'>{date.getDate()}</div>
                  <div className='text-xs text-gray-500'>
                    {date.toLocaleDateString('ja-JP', { weekday: 'short' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='relative grid w-[975px] grid-cols-7 gap-px bg-gray-100 md:w-full'>
            {weekDates.map((date, dateIndex) => (
              <div key={dateIndex} className='bg-background'>
                {hours.map((hour) => {
                  // TODO: その日のReservationsを作る
                  return (
                    <div
                      key={hour}
                      className='relative h-14 border-b border-gray-100'
                    >
                      {reservationsState
                        .filter((event) => {
                          const eventStart = parseInt(
                            event.start_time.split(':')[0],
                          )
                          return eventStart === hour
                        })
                        .map((event) => (
                          <div
                            key={event.id}
                            className='absolute mb-1 w-full truncate rounded-lg bg-blue-100 p-1 text-xs text-blue-800'
                            style={{
                              top: `${(parseInt(event.start_time.split(':')[1]) / 60) * 56}px`,
                              height: `${((parseInt(event.end_time.split(':')[0]) * 60 + parseInt(event.end_time.split(':')[1]) - (parseInt(event.start_time.split(':')[0]) * 60 + parseInt(event.start_time.split(':')[1]))) / 60) * 56}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            {event.store_id}
                          </div>
                        ))}
                    </div>
                  )
                })}
              </div>
            ))}
            <div
              className='index-x-0 absolute z-20 h-0.5 bg-red-500'
              style={{ top: `${getCurrentTimePosition()}px` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
