import type { Reservation } from './type'

interface Props {
  reservation: Reservation & {
    menus: { name: string }
    users: { name: string }
  }
  handleReservationClick: (reservation: Reservation) => void
}

export const ReservationCard = ({
  reservation,
  handleReservationClick,
}: Props) => {
  const { start_time, end_time, menus, users } = reservation
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
      {menus.name}
      <br />
      {users.name}
    </div>
  )
}
