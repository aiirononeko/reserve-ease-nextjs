import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const FirstView = () => {
  return (
    <div className='mx-4 mb-8 flex flex-col space-y-8'>
      <div className='space-y-4'>
        <div className='relative'>
          <h2 className='relative z-10 text-4xl font-bold leading-[50px]'>
            革新的な
            <br />
            予約管理システム
          </h2>
          <span className='absolute -top-14 right-4 -z-50 whitespace-nowrap text-[80px] font-bold text-gray-100'>
            Reserve
          </span>
          <span className='rotate-370 absolute -right-4 top-10 -z-50 whitespace-nowrap text-[80px] font-bold text-gray-100 [text-orientation:mixed] [writing-mode:vertical-rl]'>
            Ease
          </span>
        </div>
        <p className='font-semibold leading-7'>
          フリーランスや個人店向けに、
          <br />
          シンプルで低価格な予約管理を実現。
          <br />
          完全月額500円でお使いいただけます。
        </p>
      </div>
      <Button variant='default' asChild>
        <Link href='/'>
          初月無料で始める
          <ChevronRight className='ml-1' />
        </Link>
      </Button>
    </div>
  )
}
