'use client'

import type { Database } from '@/types/supabase'
import { addDay, dayStart } from '@formkit/tempo'
import { useEffect, useState } from 'react'
import { getReservations } from './data'
import { DateSelector } from './date-selector'
import { TimeGrid } from './time-grid'
import { useCalendar } from './use-calender'

interface Props {
  store: Database['public']['Tables']['stores']['Row']
  menus: Database['public']['Tables']['menus']['Row'][]
  userId: string
}

export function Calender({ store, menus, userId }: Props) {
  const [currentDate, setCurrentDate] = useState(dayStart(new Date()))
  const [reservations, setReservations] = useState<
    Database['public']['Tables']['reservations']['Row'][]
  >([])

  const { times, getGridCols, getReservation, duringReservation, getHeight } =
    useCalendar(currentDate, reservations)

  useEffect(() => {
    const get = async () => {
      const result = await getReservations(currentDate)
      setReservations(result)
    }
    get()
  }, [currentDate])

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
        userId={userId}
        storeId={store.id}
        menus={menus}
      />
    </div>
  )
}
