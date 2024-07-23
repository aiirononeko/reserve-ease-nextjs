import { addDay } from '@formkit/tempo'

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
    setCurrentDate(addDay(currentDate, 7))
  }

  const prevWeek = () => {
    setCurrentDate(addDay(currentDate, -7))
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
