import type { Database } from '@/types/supabase'

import { MenuDeleteDialog } from './menu-delete-dialog'
import { MenuFormDialog } from './menu-form-dialog'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
}

export const MenuCard = ({ menu }: Props) => {
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
      <div className='flex flex-row items-center justify-end space-x-4'>
        <MenuFormDialog menu={menu} />
        <MenuDeleteDialog menu={menu} />
      </div>
    </div>
  )
}
