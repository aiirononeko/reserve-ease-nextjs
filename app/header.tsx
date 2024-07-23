import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { getUser } from './data'
import { checkUserRole } from './utils'

export const Header = async () => {
  const user = await getUser()
  const userRole = checkUserRole(user)

  return (
    <header className='flex h-14 flex-row items-center justify-between border-b bg-background px-4'>
      <div className='flex flex-row space-x-1'>
        <h1 className='text-xl font-semibold text-primary'>ReserveEase</h1>
      </div>
      {user && (
        <Popover>
          <PopoverTrigger>
            <Menu />
          </PopoverTrigger>
          <PopoverContent className='flex w-40 flex-col'>
            <Button variant='link' asChild>
              <Link href='/dashboard'>ダッシュボード</Link>
            </Button>
            <Button variant='link' asChild>
              <Link href='/dashboard/menus'>メニュー管理</Link>
            </Button>
            <Button variant='link' asChild>
              <Link href='/dashboard/profile'>プロフィール管理</Link>
            </Button>
            {userRole === 'owner' && (
              <>
                <Button variant='link' asChild>
                  <Link href='/dashboard/store'>店舗情報管理</Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/dashboard/business-hours'>営業時間管理</Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/dashboard/staff'>スタッフ管理</Link>
                </Button>
              </>
            )}
          </PopoverContent>
        </Popover>
      )}
    </header>
  )
}
