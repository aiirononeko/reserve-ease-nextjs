'use client'

import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { reservationAtom } from '../jotai'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
  staff: Database['public']['Tables']['staffs']['Row'] | undefined
}

export const MenuCard = ({ menu, staff }: Props) => {
  const router = useRouter()
  const [reservation, setReservation] = useAtom(reservationAtom)

  useEffect(() => {
    if (staff) {
      setReservation({ ...reservation, staff })
    }
  }, [staff])

  const handleClick = () => {
    setReservation({ ...reservation, menu })
    router.push(`/reservation/date?store_id=${reservation.store.id}`)
  }

  return (
    <div className='w-full space-y-4 border border-primary p-4'>
      <p className='text-lg font-bold'>{menu.name}</p>
      <p className='whitespace-pre-wrap text-xs'>{menu.description}</p>
      <div className='space-y-2'>
        <p className='text-xs'>所要時間(目安): {menu.minutes}分</p>
        {menu.discount > 0 ? (
          <p className='space-x-1 text-xs'>
            料金: <span className='line-through'>{menu.amount}円(税込)</span>
            <span className='font-semibold text-destructive'>
              {menu.amount - menu.discount}円(税込)
            </span>
          </p>
        ) : (
          <p className='text-xs'>
            料金: <span className='font-semibold'>{menu.amount}円(税込)</span>
          </p>
        )}
      </div>
      <Button onClick={handleClick} className='h-10 text-xs'>
        このメニューで予約する
      </Button>
    </div>
  )
}
