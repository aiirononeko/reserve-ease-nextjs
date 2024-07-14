'use client'

import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { reservationAtom } from '../jotai'

interface Props {
  staff: Database['public']['Tables']['users']['Row']
}

export const StaffCard = ({ staff }: Props) => {
  const router = useRouter()
  const [reservation, setReservation] = useAtom(reservationAtom)

  const handleClick = () => {
    setReservation({ ...reservation, staff })
    router.push(`/reservation/menus?staff_id=${staff.id}`)
  }

  return (
    <div className='grid h-[156px] w-full grid-cols-3 border border-primary'>
      <div className='relative bg-muted'>
        {staff.icon_url && (
          <Image
            src={staff.icon_url}
            fill={true}
            alt={`${staff.name}のアイコン`}
          />
        )}
      </div>
      <div className='col-span-2 space-y-3 p-4'>
        <div className='grid grid-cols-3'>
          <p className='col-span-2 text-lg font-bold'>{staff.name}</p>
          <Button onClick={handleClick} className='col-span-1 h-7 text-xs'>
            指名する
          </Button>
        </div>
        <p className='line-clamp-5 whitespace-pre-wrap text-xs'>
          {staff.profile}
        </p>
      </div>
    </div>
  )
}
