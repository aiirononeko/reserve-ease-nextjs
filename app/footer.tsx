import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='sticky top-full flex flex-col items-center justify-center border-t bg-background py-2 text-primary md:h-16 md:flex-row md:gap-3 md:px-[160px]'>
      <div className='container mx-auto space-y-4 p-4'>
        <div>
          <h1 className='text-center text-lg font-bold'>ReserveEase</h1>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Button variant='link' asChild className='h-8 pl-0'>
            <Link href='/articles' className='text-xs'>
              記事一覧
            </Link>
          </Button>
          <Button variant='link' asChild className='h-8 pl-0'>
            <Link href='/' className='text-xs'>
              利用規約
            </Link>
          </Button>
          <Button variant='link' asChild className='h-8 pl-0'>
            <Link href='/' className='text-xs'>
              プライバシーポリシー
            </Link>
          </Button>
        </div>
        <p className='text-center text-xs'>
          &copy; 2024 ReserveEase. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
