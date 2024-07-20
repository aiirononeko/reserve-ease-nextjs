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
  // TODO: 決めうちでJSTにしているが、offsetから計算できるようにする
  // const t = offset(reservationDate, 'UTC')
  const startHour = Number(start_time.split(':')[0]) + 9
  const endHour = Number(end_time.split(':')[0]) + 9
  return (
    <div
      className='absolute mb-1 w-full truncate rounded-lg bg-primary p-1 text-xs text-primary-foreground'
      style={{
        top: '0',
        height: '100%',
      }}
      onClick={() => handleReservationClick(reservation)}
    >
      {startHour}:00 ~ {endHour}:00
      <br />
      {customers.name}
      <br />
      {menus.name}
    </div>
  )
}
