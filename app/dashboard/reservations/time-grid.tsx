import type { Database } from '@/types/supabase'
import { addHour, date, format } from '@formkit/tempo'
import type { ReactNode } from 'react'
import { DuringCard } from './during-card'
import { EmptyCard } from './empty-card'
import { ReservationCard } from './reservation-card'

interface Props {
  times: Date[]
  maxCapacity: number
  getGridCols: (maxCapacity: number) => string
  filteringReservations: (
    time: Date,
  ) => Database['public']['Tables']['reservations']['Row'][]
  filteringDuringReservations: (
    time: Date,
  ) => Database['public']['Tables']['reservations']['Row'][]
  getHeight: (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => string
  staffId: string
  storeId: number
  menus: Database['public']['Tables']['menus']['Row'][]
}

type Reservation = Database['public']['Tables']['reservations']['Row']

interface ReservationState {
  reservation: Reservation
  isDuring: boolean
}

export function TimeGrid({
  times,
  maxCapacity,
  getGridCols,
  filteringReservations,
  filteringDuringReservations,
  getHeight,
  staffId,
  storeId,
  menus,
}: Props) {
  const renderTimeSlots = () => {
    const timeSlots: ReactNode[] = []
    const reservationColumns: Record<string, number> = {}

    for (let i = 0; i < times.length - 1; i++) {
      const currentTime = times[i]
      const nextTime = times[i + 1]

      const reservations = filteringReservations(currentTime)
      const duringReservations = filteringDuringReservations(currentTime)

      const slotReservations: (ReservationState | null)[] = new Array(
        maxCapacity,
      ).fill(null)

      reservations.forEach((reservation) => {
        const startTime = addHour(date(reservation.start_datetime), 9)
        const endTime = addHour(date(reservation.end_datetime), 9)
        const isDuring = duringReservations.includes(reservation)

        if (startTime <= currentTime && endTime >= nextTime) {
          let columnIndex: number

          if (reservationColumns[reservation.id] !== undefined) {
            columnIndex = reservationColumns[reservation.id]
          } else {
            columnIndex = slotReservations.findIndex((slot) => slot === null)
            if (columnIndex !== -1) {
              reservationColumns[reservation.id] = columnIndex
            }
          }

          if (columnIndex !== -1 && columnIndex < maxCapacity) {
            slotReservations[columnIndex] = { reservation, isDuring }
          }
        }
      })

      timeSlots.push(
        <div
          key={currentTime.toISOString()}
          className={`grid h-20 border-t ${getGridCols(maxCapacity)}`}
        >
          {slotReservations.map((reservationState, index) => {
            if (!reservationState) {
              return (
                <EmptyCard
                  key={`empty-${currentTime.toISOString()}-${index}`}
                  date={currentTime}
                  staffId={staffId}
                  storeId={storeId}
                  menus={menus}
                />
              )
            }

            const { reservation, isDuring } = reservationState
            const CardComponent = isDuring ? DuringCard : ReservationCard
            const startTime = addHour(date(reservation.start_datetime), 9)

            // Only render the card if this is the start slot or it's a during card
            if (startTime.getTime() === currentTime.getTime() || isDuring) {
              return (
                <CardComponent
                  key={`${isDuring ? 'during' : 'reservation'}-${reservation.id}-${currentTime.toISOString()}`}
                  cardHeight={getHeight(reservation)}
                  reservation={reservation}
                  staffId={staffId}
                />
              )
            } else {
              // Render an empty div to maintain the grid structure
              return (
                <div
                  key={`placeholder-${reservation.id}-${currentTime.toISOString()}`}
                />
              )
            }
          })}
        </div>,
      )
    }

    return timeSlots
  }

  return (
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
      <div className='col-span-5 py-5'>{renderTimeSlots()}</div>
    </div>
  )
}
