import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import { addHour, format } from '@formkit/tempo'
import Link from 'next/link'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
}

export const RecentReservationSection = ({ reservation }: Props) => {
  const startDate = format({
    date: addHour(new Date(reservation.start_datetime), 9),
    format: 'YYYY/MM/DD',
  })
  const startTime = format({
    date: addHour(new Date(reservation.start_datetime), 9),
    format: 'HH:mm',
  })
  const endTime = format({
    date: addHour(new Date(reservation.end_datetime), 9),
    format: 'HH:mm',
  })

  return (
    <div className='w-full space-y-4 border p-4'>
      <p className='font-bold'>まもなく開始予定の予約</p>
      <div className='grid grid-cols-2'>
        <div className='col-span-1 space-y-2'>
          <p>予約日時</p>
          <p>予約時刻</p>
          <p>メニュー</p>
          <p>顧客</p>
        </div>
        <div className='col-span-1 space-y-2'>
          <p>{startDate}</p>
          <p>
            {startTime} ~ {endTime}
          </p>
          {/* @ts-expect-error because: JOINした時の型定義後でやる */}
          <p>{reservation.menus.name}</p>
          {/* @ts-expect-error because: JOINした時の型定義後でやる */}
          <p>{reservation.customers.name} 様</p>
        </div>
      </div>
      <Button variant='ghost' asChild className='p-0'>
        <Link href='/dashboard/reservations' className='underline'>
          予約を確認する
        </Link>
      </Button>
    </div>
  )
}
