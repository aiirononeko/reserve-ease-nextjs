import { getUser } from '@/app/data'
import { getReservations } from './data'
import { ReservationCalendar } from './reservation-calendar'

export default async function Page() {
  const user = await getUser()
  const reservations = await getReservations(user)

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      {reservations && (
        <ReservationCalendar reservations={reservations} user={user} />
      )}
    </div>
  )
}
