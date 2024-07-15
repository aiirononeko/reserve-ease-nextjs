'use client'

import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import { addDay, format } from '@formkit/tempo'
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [times, setTimes] = useState<string[]>()

  const today = new Date()
  const dates = Array.from({ length: 14 }, (_, i) => addDay(today, i))

  const disabledTimes = getDisabledTimes()

  useEffect(() => {
    setTimes(getTimes(businessHours, selectedDate))
  }, [businessHours, selectedDate])

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
        {times &&
          times.map((t) => (
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
