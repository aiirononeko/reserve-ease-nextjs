'use client'

import { date, format } from '@formkit/tempo'

interface Props {
  reservation: {
    id: number
    start_datetime: string
    end_datetime: string
  }
  handleReservationClick: (reservation: {
    id: number
    start_datetime: string
    end_datetime: string
  }) => void
}

export const ReservationCard = ({
  reservation,
  handleReservationClick,
}: Props) => {
  // @ts-expect-error because JOINした時の型定義あとでやる
  const { start_datetime, end_datetime, menus, customers } = reservation

  const startTime = format({
    date: date(start_datetime),
    format: 'HH:MM',
  })
  const endTime = format({
    date: date(end_datetime),
    format: 'HH:MM',
  })

  return (
    <div
      className='absolute mb-1 w-full truncate rounded-lg bg-primary p-1 text-xs text-primary-foreground'
      style={{
        top: '0',
        height: '100%',
      }}
      onClick={() => handleReservationClick(reservation)}
    >
      <p>
        {startTime} ~ {endTime}
      </p>
      <p>{customers.name}</p>
      <p>{menus.name}</p>
    </div>
  )
}
