import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { getStoreName, getUser } from './data'
import { checkUserRole } from './utils'

export const Header = async () => {
  try {
    const user = await getUser()
    const storeName = await getStoreName(user.user_metadata.store_id)
    const userRole = checkUserRole(user)

    return (
      <header className='flex h-14 flex-row items-center justify-between border-b bg-background px-4'>
        <div className='flex flex-row space-x-1'>
          <h1 className='text-xl font-semibold text-primary'>{storeName}</h1>
        </div>
        <Popover>
          <PopoverTrigger>
            <Menu />
          </PopoverTrigger>
          <PopoverContent className='flex w-40 flex-col'>
            <PopoverClose asChild>
              <Button variant='link' asChild>
                <Link href='/dashboard'>ダッシュボード</Link>
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant='link' asChild>
                <Link href='/dashboard/reservations'>予約管理</Link>
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant='link' asChild>
                <Link href='/dashboard/menus'>メニュー管理</Link>
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant='link' asChild>
                <Link href='/dashboard/profile'>プロフィール管理</Link>
              </Button>
            </PopoverClose>
            {userRole === 'owner' && (
              <>
                <PopoverClose asChild>
                  <Button variant='link' asChild>
                    <Link href='/dashboard/store'>店舗情報管理</Link>
                  </Button>
                </PopoverClose>
                <PopoverClose asChild>
                  <Button variant='link' asChild>
                    <Link href='/dashboard/business-hours'>営業時間管理</Link>
                  </Button>
                </PopoverClose>
                <PopoverClose asChild>
                  <Button variant='link' asChild>
                    <Link href='/dashboard/staff'>スタッフ管理</Link>
                  </Button>
                </PopoverClose>
              </>
            )}
          </PopoverContent>
        </Popover>
      </header>
    )
  } catch (e) {
    return (
      <header className='flex h-14 flex-row items-center justify-between border-b bg-background px-4'>
        <div className='flex flex-row space-x-1'>
          <h1 className='text-xl font-semibold text-primary'>ReserveEase</h1>
        </div>
      </header>
    )
  }
}
