import type { ReservationType } from './type'

interface Props {
  reservation: ReservationType
  handleReservationClick: (reservation: ReservationType) => void
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
