'use client'

import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import { useAtom } from 'jotai'
import { ChevronRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { reservationAtom } from '../jotai'

interface Props {
  store: Database['public']['Tables']['stores']['Row']
}

export const Store = ({ store }: Props) => {
  const router = useRouter()
  const [reservation, setReservation] = useAtom(reservationAtom)
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setReservation({ ...reservation, store })
    router.push(`/reservation/staffs?store_id=${store.id}`)
    setLoading(false)
  }

  return (
    <>
      {store.icon_url && (
        <div className='relative h-[320px] w-full bg-red-900'>
          <Image
            src={store.icon_url}
            priority={true}
            fill={true}
            alt={`${store.name}のアイコン`}
            className='object-cover'
          />
        </div>
      )}
      <div className='mx-4 mt-6 space-y-6'>
        <p className='text-2xl font-bold'>{store.name}</p>
        <p className='whitespace-pre-wrap'>{store.description}</p>
        <Button onClick={handleClick} className='w-full'>
          {loading ? (
            <Loader2 className='mr-2 size-4 animate-spin' />
          ) : (
            <>この店舗を予約する</>
          )}
          <ChevronRight className='ml-1' />
        </Button>
      </div>
    </>
  )
}
