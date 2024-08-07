'use client'

import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { reservationAtom } from '../jotai'

interface Props {
  staff: Database['public']['Tables']['staffs']['Row']
}

export const StaffCard = ({ staff }: Props) => {
  const router = useRouter()
  const [reservation, setReservation] = useAtom(reservationAtom)
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setReservation({ ...reservation, staff })
    router.push(`/reservation/menus?staff_id=${staff.id}`)
    setLoading(false)
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
            {loading ? (
              <Loader2 className='mr-2 size-4 animate-spin' />
            ) : (
              <>指名する</>
            )}
          </Button>
        </div>
        <p className='line-clamp-5 whitespace-pre-wrap text-xs'>
          {staff.profile}
        </p>
      </div>
    </div>
  )
}
