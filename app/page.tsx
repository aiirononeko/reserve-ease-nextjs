import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FirstView } from './_sections/first-view'

export const metadata: Metadata = {
  title: 'フリーランス向けの圧倒的低価格な予約システム | ReserveEase',
  description:
    '月額500円、従量課金なしで利用できるフリーランス・個人店向け予約管理システムです。初月無料、最短3分で導入できるため、今すぐあなたのビジネスの予約を管理できます。',
}

export default function Page() {
  return (
    <div className='my-8 flex max-w-96 flex-col md:mx-auto'>
      <FirstView />
      <div className='relative h-[400px] w-full'>
        <Image
          src='/top.jpg'
          alt='トップページの画像'
          fill={true}
          className='object-cover'
        />
        <div className='absolute left-4 top-44 z-10 flex h-full flex-col items-center'>
          <span className='rotate-270 text-sm font-bold tracking-widest text-background [writing-mode:vertical-rl]'>
            SCROLL
          </span>
          <div className='mt-4 h-16 w-px bg-background'></div>
        </div>
      </div>
      <div className='flex flex-col space-y-10 bg-primary py-10 text-background'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Service</h2>
          <h3 className='text-center text-xl font-bold'>導入メリット</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8 text-gray-100'>
          <div className='flex items-center space-x-6'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-br-2xl bg-gray-100 text-xl font-bold text-primary'>
              01.
            </div>
            <div className='space-y-1'>
              <p className='text-xl font-bold'>圧倒的低価格でコスト削減</p>
              <p className='text-gray-200'>
                洗練された予約管理機能のみを提供するため、圧倒的低価格です。
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-6'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-br-2xl bg-gray-100 text-xl font-bold text-primary'>
              02.
            </div>
            <div className='space-y-1'>
              <p className='text-xl font-bold'>シンプルで直感的な操作感</p>
              <p className='text-gray-200'>
                使いやすく誰でも簡単に予約管理ができます。
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-6'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-br-2xl bg-gray-100 text-xl font-bold text-primary'>
              03.
            </div>
            <div className='space-y-1'>
              <p className='text-xl font-bold'>追加課金なし</p>
              <p className='text-gray-200'>
                スタッフや店舗を追加しても、
                <br />
                月額980円でご利用いただけます。
              </p>
            </div>
          </div>
          <div className='mb-4 flex items-center space-x-6'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-br-2xl bg-gray-100 text-xl font-bold text-primary'>
              04.
            </div>
            <div className='space-y-1'>
              <p className='text-xl font-bold'>最速でシステム導入が可能</p>
              <p className='text-gray-200'>
                お問い合わせいただいてから最短3分で利用開始できます。
              </p>
            </div>
          </div>
          <Button variant='outline' asChild>
            <Link href='/' className='text-primary'>
              初月無料で始める
              <ChevronRight className='ml-1' />
            </Link>
          </Button>
        </div>
      </div>
      <div className='flex flex-col space-y-8 py-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Features</h2>
          <h3 className='text-center text-xl font-bold'>機能一覧</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8'></div>
      </div>
      <div className='flex flex-col space-y-8 bg-primary py-8 text-background'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Case</h2>
          <h3 className='text-center text-xl font-bold'>導入事例</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8'></div>
      </div>
      <div className='flex flex-col space-y-8 py-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Flow</h2>
          <h3 className='text-center text-xl font-bold'>導入まで</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8'></div>
      </div>
    </div>
  )
}
