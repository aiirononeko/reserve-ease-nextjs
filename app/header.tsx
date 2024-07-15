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
        <svg
          width='30'
          height='30'
          viewBox='0 0 67 38'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.02485 15.0067L6 22.0391L57.6893 22.1797L60.1113 15.1863L9.02485 15.0067Z'
            fill='#585858'
          />
          <path
            d='M15.0249 0.00668655L12 7.03906L63.6893 7.1797L66.1113 0.186255L15.0249 0.00668655Z'
            fill='black'
          />
          <path
            d='M3.02485 30.0067L-1.9616e-08 37.0391L51.6893 37.1797L54.1113 30.1863L3.02485 30.0067Z'
            fill='black'
          />
        </svg>
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
