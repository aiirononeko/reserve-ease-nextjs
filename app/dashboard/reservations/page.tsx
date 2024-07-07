import { checkAuth } from '../auth'
import { getReservations } from './data'
import { ReservationCalendar } from './reservation-calendar'

export default async function Page() {
  const user = await checkAuth()
  const reservations = await getReservations(user)

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-bold'>予約管理</h1>
      {reservations && (
        <ReservationCalendar reservations={reservations} user={user} />
      )}
    </div>
  )
}
