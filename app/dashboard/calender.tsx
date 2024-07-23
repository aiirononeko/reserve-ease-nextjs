'use client'

import type { Database } from '@/types/supabase'
import {
  addDay,
  addHour,
  date,
  dayStart,
  diffMinutes,
  format,
  isAfter,
  isBefore,
  sameHour,
  sameMinute,
} from '@formkit/tempo'
import { useMemo, useState } from 'react'
import { DateSelector } from './date-selector'
import { generateHourlyIntervals } from './utils'

interface Props {
  reservations: Database['public']['Tables']['reservations']['Row'][]
  store: Database['public']['Tables']['stores']['Row']
  menus: Database['public']['Tables']['menus']['Row'][]
}

// TODO: reservationのstart_datetimeとend_datetimeをaddHourしているので直す
export function Calender({ reservations, store, menus }: Props) {
  const [currentDate, setCurrentDate] = useState(dayStart(date()))

  const times = useMemo(() => {
    // MEMO: 一旦7時から22時で決めうち
    return generateHourlyIntervals(
      addHour(currentDate, 7),
      addHour(currentDate, 22),
    )
  }, [currentDate])

  /*
   * 対象の時刻Rowに予約が存在するか確認.
   */
  const reservationExists = (target: Date) => {
    return reservations.some((reservation) => {
      return (
        sameHour(addHour(date(reservation.start_datetime), 9), target) &&
        sameMinute(addHour(date(reservation.start_datetime)), target)
      )
    })
  }

  /*
   * 対象の時刻から始まる予約を取得する.
   */
  const getReservation = (target: Date) => {
    return reservations.filter((reservation) => {
      return (
        sameHour(addHour(date(reservation.start_datetime), 9), target) &&
        sameMinute(addHour(date(reservation.start_datetime)), target)
      )
    })
  }

  const duringReservation = (target: Date) => {
    return reservations.some((reservation) => {
      return (
        isAfter(target, addHour(date(reservation.start_datetime), 9)) &&
        isBefore(target, addHour(date(reservation.end_datetime), 9))
      )
    })
  }

  const getHeight = (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => {
    const diff = diffMinutes(
      date(reservation.end_datetime),
      date(reservation.start_datetime),
    )
    const n = 80 * (diff / 30)
    return `h-[${n}px]`
  }

  const prev = () => {
    setCurrentDate(addDay(currentDate, -1))
  }

  const next = () => {
    setCurrentDate(addDay(currentDate, 1))
  }

  return (
    <div className='space-y-4'>
      <DateSelector currentDate={currentDate} prev={prev} next={next} />
      <div className='grid grid-cols-6 border-y'>
        <div className='col-span-1 border-r py-2'>
          {times.map((time, index) => (
            <div key={time.toISOString()}>
              {times.length > index + 1 ? (
                <div className='h-20 font-semibold tracking-wide text-gray-500'>
                  {format(time, 'HH:mm')}
                </div>
              ) : (
                <div className='font-semibold tracking-wide text-gray-500'>
                  {format(time, 'HH:mm')}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='col-span-5 py-5'>
          {times.map((time, index) => (
            <div key={time.toISOString()}>
              <div className='grid grid-cols-2'>
                {reservationExists(time) ? (
                  getReservation(time).map((reservation, index) => (
                    <>
                      {duringReservation(time) && (
                        <div className='h-20 w-full border-r'></div>
                      )}
                      <div className='relative h-20'>
                        <div
                          key={reservation.id}
                          className={`absolute flex w-full flex-col items-start justify-center space-y-1 border bg-primary px-4 text-xs font-semibold tracking-wide text-white ${getHeight(reservation)}`}
                        >
                          <div className='space-x-1'>
                            <span>
                              {format(
                                addHour(date(reservation.start_datetime), 9),
                                'HH:mm',
                              )}
                            </span>
                            <span>~</span>
                            <span>
                              {format(
                                addHour(date(reservation.end_datetime), 9),
                                'HH:mm',
                              )}
                            </span>
                          </div>
                          {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                          {reservation.customers.name && (
                            // @ts-expect-error because JOINした時の型定義あとでやる
                            <p>{reservation.customers.name} 様</p>
                          )}
                          {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                          <p>{reservation.menus.name}</p>
                          {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                          <p>{reservation.users.name}</p>
                        </div>
                      </div>
                      <>
                        <div className='h-20 w-full border-r'></div>
                      </>
                    </>
                  ))
                ) : (
                  <>
                    {times.length > index + 1 && (
                      <div className='h-20 w-full border-r'></div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
