import { Calender } from './calender'
import { getMenus, getReservations } from './data'

export default async function Page() {
  const reservations = await getReservations()
  const menus = await getMenus()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-4'>
      {reservations && <Calender reservations={reservations} menus={menus} />}
    </div>
  )
}
