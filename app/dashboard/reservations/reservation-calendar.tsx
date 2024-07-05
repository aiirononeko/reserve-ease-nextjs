'use client'

import type { AuthUser } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'
import { ReservationCalendarHeader } from './reservation-calendar-header'
import { ReservationCard } from './reservation-card'
import { ReservationModal } from './reservation-modal'

interface Props {
  reservations: {
    id: number
    date: string
    start_time: string
    end_time: string
  }[]
  user: AuthUser
}

export const ReservationCalendar: React.FC<Props> = ({
  reservations,
  user,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedReservation, setSelectedReservation] = useState<{
    id: number
    date: string
    start_time: string
    end_time: string
  } | null>(null)
  const [newReservationDate, setNewReservationDate] = useState<Date | null>(
    null,
  )
  const [newReservationTime, setNewReservationTime] = useState<string | null>(
    null,
  )

  useEffect(() => {
    console.log(selectedReservation)
  }, [selectedReservation])

  const getWeekDates = useMemo(() => {
    const today = new Date(currentDate)
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      return date
    })
  }, [currentDate])

  const hours = Array.from({ length: 17 }, (_, i) => i + 7) // 7時から23時まで

  const isReservationInHour = (
    date: Date,
    hour: number,
    reservation: {
      id: number
      date: string
      start_time: string
      end_time: string
    },
  ) => {
    const reservationDate = new Date(reservation.date)
    const startHour = parseInt(reservation.start_time.split(':')[0])
    const endHour = parseInt(reservation.end_time.split(':')[0])
    return (
      reservationDate.getDate() === date.getDate() &&
      reservationDate.getMonth() === date.getMonth() &&
      reservationDate.getFullYear() === date.getFullYear() &&
      startHour <= hour &&
      endHour > hour
    )
  }

  const handleEmptySlotClick = (date: Date, hour: number) => {
    setNewReservationDate(date)
    setNewReservationTime(`${hour.toString().padStart(2, '0')}:00`)
    // setSelectedReservation(null)
  }

  const handleReservationClick = (reservation: {
    id: number
    date: string
    start_time: string
    end_time: string
  }) => {
    setSelectedReservation(reservation)
  }

  const handleCloseModal = () => {
    setSelectedReservation(null)
    setNewReservationDate(null)
    setNewReservationTime(null)
  }

  return (
    <div className='w-full'>
      <ReservationCalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        weekDates={getWeekDates}
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
            {getWeekDates.map((date, dateIndex) => (
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
            {getWeekDates.map((date, dateIndex) => (
              <div key={dateIndex} className='bg-background'>
                {hours.map((hour) => {
                  const reservationsInHour = reservations.filter(
                    (reservation) =>
                      isReservationInHour(date, hour, reservation),
                  )
                  return (
                    <div
                      key={hour}
                      className='relative h-14 border-b border-gray-100'
                      onClick={() => handleEmptySlotClick(date, hour)}
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
            isOpen={
              !!selectedReservation ||
              (!!newReservationDate && !!newReservationTime)
            }
            onClose={handleCloseModal}
            reservation={selectedReservation}
            user={user}
            newReservationDate={newReservationDate}
            newReservationTime={newReservationTime}
          />
        </div>
      </div>
    </div>
  )
}
