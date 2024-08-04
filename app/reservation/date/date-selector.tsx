'use client'

import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import {
  addDay,
  addHour,
  addMinute,
  date,
  dayStart,
  format,
} from '@formkit/tempo'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { reservationAtom } from '../jotai'
import { getDisabledTimes, getTimes } from './utils'

interface Props {
  businessHours: Database['public']['Tables']['business_hours']['Row'][]
}

export default function DateSelector({ businessHours }: Props) {
  const router = useRouter()

  const [reservation, setReservation] = useAtom(reservationAtom)

  const [selectedDate, setSelectedDate] = useState<Date>(dayStart(new Date()))
  const [times, setTimes] = useState<string[]>()
  const [disabledTimes, setDisabledTimes] = useState<string[]>()

  const dates = Array.from({ length: 14 }, (_, i) =>
    addDay(dayStart(new Date()), i),
  )

  useEffect(() => {
    const result = getTimes(businessHours, selectedDate)
    setTimes(result)
  }, [businessHours, selectedDate])

  useEffect(() => {
    const fetchAndSetDisabledTimes = async () => {
      const result = await getDisabledTimes(
        reservation.store.id,
        selectedDate,
        reservation.store.capacity,
      )
      setDisabledTimes(result)
    }

    fetchAndSetDisabledTimes()
  }, [selectedDate])

  const handleClick = (selectedDate: Date, selectedTime: string) => {
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const startDatetime = addHour(
      addMinute(date(selectedDate), minutes),
      hours,
    ).toISOString()
    setReservation({ ...reservation, startDatetime })
    router.push('/reservation/customer')
  }

  return (
    <div className='mx-4 w-full bg-background p-4 shadow'>
      <p className='mb-4 text-sm font-bold'>
        ご希望の来店日時を選択してください。
      </p>
      <div className='mb-6 overflow-x-auto'>
        <div className='flex space-x-2 pb-2'>
          {dates.map((date) => (
            <Button
              key={date.toISOString()}
              variant={
                selectedDate?.toDateString() === date.toDateString()
                  ? 'default'
                  : 'outline'
              }
              onClick={() => setSelectedDate(date)}
              className='w-16 shrink-0'
            >
              <div className='text-center'>
                <div className='text-md'>{format(date, 'M/D')}</div>
                <div className='text-xs'>{format(date, 'd')}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {times &&
          disabledTimes &&
          times.map((t) => (
            <Button
              key={t}
              variant='outline'
              disabled={disabledTimes.includes(t)}
              onClick={() => handleClick(selectedDate, t)}
              className={
                disabledTimes.includes(t) ? 'w-full bg-gray-300' : 'w-full'
              }
            >
              {disabledTimes.includes(t) ? (
                <span className='line-through'>{t}</span>
              ) : (
                <span className='font-bold'>{t}</span>
              )}
            </Button>
          ))}
        {!times ||
          (times.length === 0 && (
            <p className='col-span-2 text-center text-xs'>
              ご予約いただける時間がありません
            </p>
          ))}
      </div>
    </div>
  )
}
