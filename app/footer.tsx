import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='sticky top-full flex flex-col items-center justify-center border-t bg-background py-2 text-primary md:h-16 md:flex-row md:gap-3 md:px-[160px]'>
      <div className='container mx-auto space-y-2 p-4'>
        <div className='flex flex-row items-center justify-center space-x-2'>
          <Link className='text-xs' href='/'>
            利用規約
          </Link>
          <Link className='text-xs' href='/'>
            プライバシーポリシー
          </Link>
        </div>
        <p className='text-center text-xs'>
          &copy; 2024 ReserveEase. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
