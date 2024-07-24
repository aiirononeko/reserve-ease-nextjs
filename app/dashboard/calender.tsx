'use client'

import type { Database } from '@/types/supabase'
import { addDay, date, dayStart } from '@formkit/tempo'
import { useState } from 'react'
import { DateSelector } from './date-selector'
import { TimeGrid } from './time-grid'
import { useCalendar } from './use-calender'

interface Props {
  reservations: Database['public']['Tables']['reservations']['Row'][]
  store: Database['public']['Tables']['stores']['Row']
  menus: Database['public']['Tables']['menus']['Row'][]
}

export function Calender({ reservations, store, menus }: Props) {
  const [currentDate, setCurrentDate] = useState(dayStart(date()))

  const { times, getGridCols, getReservation, duringReservation, getHeight } =
    useCalendar(currentDate, reservations)

  const prev = () => setCurrentDate(addDay(currentDate, -1))
  const next = () => setCurrentDate(addDay(currentDate, 1))

  return (
    <div className='space-y-4'>
      <DateSelector currentDate={currentDate} prev={prev} next={next} />
      <TimeGrid
        times={times}
        maxCapacity={store.max_capacity}
        getGridCols={getGridCols}
        getReservation={getReservation}
        duringReservation={duringReservation}
        getHeight={getHeight}
      />
    </div>
  )
}
