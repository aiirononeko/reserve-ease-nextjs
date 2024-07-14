'use client'

import { Button } from '@/components/ui/button'
import { addDay, format } from '@formkit/tempo'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { reservationAtom } from '../jotai'

export default function DateSelector() {
  const router = useRouter()
  const [reservation, setReservation] = useAtom(reservationAtom)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const today = new Date()
  const dates = Array.from({ length: 14 }, (_, i) => addDay(today, i))

  const times = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
  ]

  const disabledTimes = ['11:30', '12:00', '14:30']

  const handleClick = (t: string) => {
    setReservation({ ...reservation, date: t })
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
        {times.map((t) => (
          <Button
            key={t}
            variant='outline'
            disabled={disabledTimes.includes(t)}
            onClick={() => handleClick(t)}
            className='w-full'
          >
            {t}
          </Button>
        ))}
      </div>
    </div>
  )
}
