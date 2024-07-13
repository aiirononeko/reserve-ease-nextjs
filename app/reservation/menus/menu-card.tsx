import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import Link from 'next/link'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
}

export const MenuCard = ({ menu }: Props) => {
  return (
    <div className='w-full space-y-4 border border-primary p-4'>
      <p className='text-lg font-bold'>{menu.name}</p>
      <p className='whitespace-pre-wrap text-xs'>{menu.description}</p>
      <div className='space-y-2'>
        <p className='text-xs'>所要時間(目安): </p>
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
      <Button asChild className='h-8 text-xs'>
        <Link
          href={`/reservation/dates?staff_id=${menu.user_id}&menu_id=${menu.id}`}
        >
          このメニューで予約する
        </Link>
      </Button>
    </div>
  )
}
