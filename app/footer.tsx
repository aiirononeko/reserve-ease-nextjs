import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='sticky top-full flex flex-col border-t bg-background py-2 text-primary'>
      <div className='space-y-4 p-4'>
        <Button variant='link' asChild className='m-0 p-0'>
          <Link href='/' className='text-xl'>
            ReserveEase
          </Link>
        </Button>
        <div className='flex flex-col items-start'>
          <Button
            variant='link'
            asChild
            className='h-8 p-0 font-normal underline'
          >
            <Link href='/articles' className='text-xs'>
              記事一覧
            </Link>
          </Button>
          <Button
            variant='link'
            asChild
            className='h-8 p-0 font-normal underline'
          >
            <Link href='/terms' className='text-xs'>
              利用規約
            </Link>
          </Button>
          <Button
            variant='link'
            asChild
            className='h-8 p-0 font-normal underline'
          >
            <Link href='/privacy-policy' className='text-xs'>
              プライバシーポリシー
            </Link>
          </Button>
          <Button
            variant='link'
            asChild
            className='h-8 p-0 font-normal underline'
          >
            <Link href='/specified' className='text-xs'>
              特商法表記
            </Link>
          </Button>
        </div>
        <p className='text-xs'>&copy; 2024 ReserveEase. All rights reserved.</p>
      </div>
    </footer>
  )
}
