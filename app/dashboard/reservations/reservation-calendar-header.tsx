interface Props {
  currentDate: Date
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  weekDates: Date[]
}

export const ReservationCalendarHeader = ({
  currentDate,
  setCurrentDate,
  weekDates,
}: Props) => {
  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))
  }

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
  }

  return (
    <div className='mb-4 flex items-center justify-between'>
      <button onClick={prevWeek}>&lt;</button>
      <div className='text-center'>
        <div className='text-sm text-gray-500'>
          {`${weekDates[0].toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}`}
        </div>
      </div>
      <button onClick={nextWeek}>&gt;</button>
    </div>
  )
}
