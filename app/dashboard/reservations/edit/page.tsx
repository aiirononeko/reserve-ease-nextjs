import type { Metadata } from 'next'
import { getReservation } from './data'
import { ReservationUpdateForm } from './reservation-update-form'

export const metadata: Metadata = {
  robots: {
    googleBot: {
      index: false,
    },
  },
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const reservation = await getReservation(Number(searchParams.reservationId))

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-4'>
      <ReservationUpdateForm reservation={reservation} />
    </div>
  )
}
