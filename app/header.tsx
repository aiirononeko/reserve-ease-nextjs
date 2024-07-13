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
      <div className='flex flex-row'>
        <svg
          width='30'
          height='30'
          viewBox='0 0 150 150'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M105.101 125.632C107.62 125.222 109.887 124.046 111.402 122.363C112.916 120.679 113.555 118.627 113.178 116.657C111.215 106.484 104.172 97.5711 93.5935 91.8744C83.0149 86.1776 69.765 84.162 56.7508 86.2699C54.2315 86.6801 51.9652 87.8562 50.4505 89.5395C48.9357 91.2224 48.2967 93.2749 48.674 95.2453C49.0511 97.2152 50.4137 98.9418 52.4618 100.044C54.51 101.148 57.0759 101.537 59.5953 101.126C67.5718 99.8348 75.6926 101.07 82.1762 104.561C88.6599 108.053 92.9768 113.515 94.18 119.751C94.5571 121.721 95.9196 123.447 97.9677 124.55C100.016 125.653 102.582 126.043 105.101 125.632Z'
            fill='#1E1E1E'
          />
          <path
            d='M59.5952 101.126C72.6116 99.0065 84.3208 92.9301 92.1467 84.2335C99.9728 75.5375 103.274 64.9333 101.326 54.7544C99.3768 44.5755 92.337 35.6557 81.7549 29.957C71.1729 24.2583 57.9154 22.2477 44.8989 24.3674C42.3796 24.7777 40.1133 25.9538 38.5986 27.637C37.0839 29.3201 36.4448 31.3725 36.822 33.3426C37.1992 35.3127 38.5617 37.0392 40.61 38.1422C42.6581 39.2451 45.224 39.6343 47.7434 39.224C51.6936 38.5807 55.7216 38.5522 59.5974 39.14C63.4733 39.7278 67.121 40.9205 70.3325 42.6499C73.5439 44.3793 76.2561 46.6116 78.3142 49.2194C80.3723 51.8271 81.736 54.7592 82.3274 57.8483C82.9188 60.9373 82.7265 64.1228 81.7612 67.2229C80.7959 70.323 79.0767 73.2769 76.7017 75.9163C74.3266 78.5552 71.3424 80.8281 67.9192 82.6047C64.4959 84.3807 60.701 85.6264 56.7507 86.2697C54.2314 86.6799 51.9651 87.856 50.4504 89.5393C48.9356 91.2222 48.2966 93.2747 48.6738 95.2446C49.051 97.215 50.4136 98.9416 52.4617 100.044C54.5099 101.147 57.0758 101.537 59.5952 101.126Z'
            fill='url(#paint0_linear_1154_61)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_1154_61'
              x1='27.232'
              y1='94.9577'
              x2='66.1483'
              y2='31.224'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#070707' />
              <stop offset='1' stopColor='#515151' />
            </linearGradient>
          </defs>
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
