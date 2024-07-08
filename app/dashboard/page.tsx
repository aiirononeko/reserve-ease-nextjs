import { getMenus, getReservations } from './data'
import { ReservationCalendar } from './reservation-calendar'

export default async function Page() {
  const { user, reservations } = await getReservations()
  const menus = await getMenus()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      {reservations && (
        <ReservationCalendar
          reservations={reservations}
          user={user}
          menus={menus}
        />
      )}
    </div>
  )
}
