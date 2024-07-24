import type { Database } from '@/types/supabase'
import { addHour, date, format } from '@formkit/tempo'

interface Props {
  cardHeight: string
  reservation: Database['public']['Tables']['reservations']['Row']
  userId: string
}

export function ReservationCard({ cardHeight, reservation, userId }: Props) {
  const startDatetime = date(reservation.start_datetime)
  const endDatetime = date(reservation.end_datetime)

  const isOwnReservation = reservation.user_id === userId

  return (
    <div className='relative h-20'>
      <div
        className={`absolute flex w-full flex-col justify-center space-y-1 px-2 text-xs font-semibold tracking-wide ${cardHeight} ${isOwnReservation ? 'bg-primary text-white' : 'border border-primary bg-white text-primary'}`}
        onClick={() => console.log(reservation.start_datetime)}
      >
        <div className='space-x-1'>
          <span>{format(addHour(startDatetime, 9), 'HH:mm')}</span>
          <span>~</span>
          <span>{format(addHour(endDatetime, 9), 'HH:mm')}</span>
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
  )
}
