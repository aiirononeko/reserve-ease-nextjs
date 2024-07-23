'use client'

import type { Database } from '@/types/supabase'
import { addDay, addHour, date, dayStart } from '@formkit/tempo'
import type { AuthUser } from '@supabase/supabase-js'
import { useMemo, useState } from 'react'
import { HOURS } from './constants'
import { ReservationCalendarHeader } from './reservation-calendar-header'
import { ReservationCard } from './reservation-card'
import { ReservationModal } from './reservation-modal'
import { generateHourlyIntervals } from './utils'

interface Props {
  reservations: {
    id: number
    start_datetime: string
    end_datetime: string
  }[]
  user: AuthUser
  menus: Database['public']['Tables']['menus']['Row'][]
}

export const ReservationCalendar: React.FC<Props> = ({
  reservations,
  user,
  menus,
}) => {
  const [currentDate, setCurrentDate] = useState(dayStart(date()))
  const [selectedReservation, setSelectedReservation] = useState<
    | {
        id: number
        start_datetime: string
        end_datetime: string
      }
    | undefined
  >(undefined)
  const [newReservationDatetime, setNewReservationDatetime] = useState<
    Date | undefined
  >(undefined)

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      return addDay(currentDate, i)
    })
  }, [currentDate])

  const times = generateHourlyIntervals(
    addHour(dayStart(date()), 7),
    addHour(dayStart(date()), 22),
  )

  const isReservationInHour = (
    targetDatetime: Date,
    reservation: {
      id: number
      start_datetime: string
      end_datetime: string
    },
  ) => {
    const startDatetime = date(reservation.start_datetime)
    const endDatetime = date(reservation.end_datetime)

    return false
    // sameDay(targetDatetime, startDatetime) &&
    // isAfter(targetDatetime, startDatetime) &&
    // isBefore(targetDatetime, endDatetime)
    // sameDay(targetDate, startDatetime) &&
    // isAfter(targetDate, startDatetime)
    // isBefore(targetDate, endDatetime)
    // reservationDate.getDate() === targetDate.getDate() &&
    // reservationDate.getMonth() === targetDate.getMonth() &&
    // reservationDate.getFullYear() === targetDate.getFullYear() &&
    // startHour <= targetHour &&
    // endHour > targetHour
  }

  const handleEmptySlotClick = (datetime: Date) => {
    setNewReservationDatetime(datetime)
  }

  const handleReservationClick = (reservation: {
    id: number
    start_datetime: string
    end_datetime: string
  }) => {
    setSelectedReservation(reservation)
  }

  const handleCloseModal = () => {
    setSelectedReservation(undefined)
    setNewReservationDatetime(undefined)
  }

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
          {HOURS.map((hour) => (
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
            {weekDates.map((weekDate, dateIndex) => (
              <div key={dateIndex} className='bg-background'>
                {times.map((time) => {
                  const reservationsInHour = reservations.filter(
                    (reservation) => isReservationInHour(time, reservation),
                  )
                  return (
                    <div
                      key={time.toISOString()}
                      className='relative h-14 border-b border-gray-100'
                      onClick={() => handleEmptySlotClick(time)}
                    >
                      {reservationsInHour.map((reservation) => (
                        <ReservationCard
                          key={reservation.id}
                          handleReservationClick={handleReservationClick}
                          reservation={reservation}
                        />
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <ReservationModal
            isOpen={!!selectedReservation || !!newReservationDatetime}
            onClose={handleCloseModal}
            reservation={selectedReservation}
            user={user}
            newReservationDatetime={newReservationDatetime}
            menus={menus}
          />
        </div>
      </div>
    </div>
  )
}
