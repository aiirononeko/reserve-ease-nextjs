import type { Metadata } from 'next'
import { Calender } from './calender'
import { getMenus, getReservations, getStore } from './data'

export const metadata: Metadata = {
  robots: {
    googleBot: {
      index: false,
    },
  },
}

export default async function Page() {
  const reservations = await getReservations()
  const store = await getStore()
  const menus = await getMenus()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-4'>
      {reservations && (
        <Calender reservations={reservations} store={store} menus={menus} />
      )}
    </div>
  )
}
