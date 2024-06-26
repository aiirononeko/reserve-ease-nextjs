interface Props {
  start_time: string
  end_time: string
  menuName: string
  userName: string
}

export const ReservationCard = ({
  start_time,
  end_time,
  menuName,
  userName,
}: Props) => {
  return (
    <div
      className='absolute mb-1 w-full truncate rounded-lg bg-primary p-1 text-xs text-primary-foreground'
      style={{
        top: '0',
        height: '100%',
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {start_time} ~ {end_time}
      <br />
      {menuName}
      <br />
      {userName}
    </div>
  )
}
