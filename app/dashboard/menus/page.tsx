import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import { getMenus } from './data'
import { MenuCard } from './menu-card'

export default async function Page() {
  const menus = await getMenus()

  return (
    <div className='mx-4 flex flex-col items-center space-y-4 py-8'>
      <h1 className='text-xl font-bold'>メニュー管理</h1>
      <div className='w-full space-y-4'>
        <Button variant='link' asChild className='w-full p-0'>
          <Link href='/dashboard/menus/new'>
            <div className='flex h-12 w-full items-center justify-center rounded border border-dotted border-primary bg-card'>
              <CirclePlus className='pr-1' />
              メニューを追加する
            </div>
          </Link>
        </Button>
        {menus &&
          menus.length > 0 &&
          menus.map((menu) => <MenuCard key={menu.id} menu={menu} />)}
      </div>
    </div>
  )
}
