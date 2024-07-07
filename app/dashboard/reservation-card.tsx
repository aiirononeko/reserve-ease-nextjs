interface Props {
  reservation: {
    id: number
    date: string
    start_time: string
    end_time: string
  }
  handleReservationClick: (reservation: {
    id: number
    date: string
    start_time: string
    end_time: string
  }) => void
}

export const ReservationCard = ({
  reservation,
  handleReservationClick,
}: Props) => {
  // @ts-expect-error because JOINした時の型定義あとでやる
  const { start_time, end_time, menus, customers } = reservation
  return (
    <div
      className='absolute mb-1 w-full truncate rounded-lg bg-primary p-1 text-xs text-primary-foreground'
      style={{
        top: '0',
        height: '100%',
      }}
      onClick={() => handleReservationClick(reservation)}
    >
      {start_time} ~ {end_time}
      <br />
      {customers.name}
      <br />
      {menus.name}
    </div>
  )
}
