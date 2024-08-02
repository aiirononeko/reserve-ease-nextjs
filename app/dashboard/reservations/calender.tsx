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
  staffId: string
}

export function Calender({ store, menus, staffId }: Props) {
  const [currentDate, setCurrentDate] = useState(dayStart(new Date()))
  const [reservations, setReservations] = useState<
    Database['public']['Tables']['reservations']['Row'][]
  >([])

  const {
    times,
    getGridCols,
    filteringReservations,
    filteringDuringReservations,
    getHeight,
  } = useCalendar(currentDate, reservations)

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
        maxCapacity={store.capacity}
        getGridCols={getGridCols}
        filteringReservations={filteringReservations}
        filteringDuringReservations={filteringDuringReservations}
        getHeight={getHeight}
        staffId={staffId}
        storeId={store.id}
        menus={menus}
      />
    </div>
  )
}
