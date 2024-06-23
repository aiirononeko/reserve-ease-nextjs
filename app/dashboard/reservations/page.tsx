import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import { checkAuth } from '../auth'
import { getReservations } from './data'
import { ReservationCard } from './reservation-card'

export default async function Page() {
  const user = await checkAuth()
  const reservations = await getReservations(user)

  return (
    <div className='mx-4 flex flex-col items-center space-y-8 py-8'>
      <h1 className='text-xl font-bold'>予約管理</h1>
      <div className='w-full space-y-4'>
        <div className='flex items-center justify-center rounded border border-dotted border-primary bg-card'>
          <Button variant='link' asChild>
            <Link href='/dashboard/reservations/new' className='text-xs'>
              <CirclePlus className='pr-1' />
              予約を追加する
            </Link>
          </Button>
        </div>
        {reservations &&
          reservations.length > 0 &&
          reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
      </div>
    </div>
  )
}
