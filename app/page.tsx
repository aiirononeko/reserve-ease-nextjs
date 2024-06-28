import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'トップページ | ReserveEase',
  description:
    'ReserveEase(リザーブイーズ)は、シンプルで使いやすい予約管理サービスです。',
}

export default function Page() {
  return (
    <div className='mx-4 my-8'>
      <div className='flex flex-col space-y-6'>
        <div className='relative'>
          <h2 className='relative z-10 text-4xl font-bold leading-[50px]'>
            革新的な
            <br />
            予約管理システム
          </h2>
          <span className='absolute -top-14 left-0 -z-50 whitespace-nowrap text-[80px] font-bold text-gray-100'>
            Reserve
          </span>
          <span className='rotate-370 absolute -right-8 -top-4 -z-50 whitespace-nowrap text-[80px] font-bold text-gray-100 [text-orientation:mixed] [writing-mode:vertical-rl]'>
            Ease
          </span>
        </div>
        <p className='font-semibold leading-7'>
          フリーランサーや個人店向けに、
          <br />
          シンプルで低価格な予約管理を実現。
          <br />
          完全月額980円でお使いいただけます。
        </p>
        <Button variant='outline' asChild>
          <Link href='/'>
            お問い合わせ
            <Mail className='ml-2' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
