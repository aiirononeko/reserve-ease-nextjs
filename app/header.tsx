import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='flex h-14 flex-row items-center justify-between border-b bg-background px-4'>
      <h1 className='text-xl font-semibold text-primary'>ReserveEase</h1>
      <Popover>
        <PopoverTrigger>
          <Menu />
        </PopoverTrigger>
        <PopoverContent className='flex w-40 flex-col'>
          <Button variant='link' asChild>
            <Link href='/dashboard'>ダッシュボード</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/dashboard/reservations'>予約管理</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/dashboard/menus'>メニュー管理</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/dashboard/store'>店舗情報管理</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/dashboard/business-hours'>営業時間管理</Link>
          </Button>
        </PopoverContent>
      </Popover>
    </header>
  )
}
