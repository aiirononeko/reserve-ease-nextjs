import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'トップページ | ReserveEase',
  description:
    'ReserveEase(リザーブイーズ)は、シンプルで使いやすい予約管理サービスです。',
}

export default function Page() {
  return (
    <div className='my-8 flex flex-col'>
      <div className='mx-4 mb-8 flex flex-col space-y-8'>
        <div className='space-y-4'>
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
        </div>
        <Button variant='default' asChild>
          <Link href='/'>
            お問い合わせ
            <Mail className='ml-2' />
          </Link>
        </Button>
      </div>
      <div className='relative h-[400px] w-full'>
        <Image
          src='/reserve-ease-top.png'
          alt='トップページの画像'
          fill={true}
          className='object-cover'
        />
        <div className='absolute left-4 top-52 z-10 flex h-full flex-col items-center'>
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
        <div className='mx-4 grid grid-cols-1 gap-8 text-gray-100 md:grid-cols-2'>
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
              お問い合わせ
              <Mail className='ml-2' />
            </Link>
          </Button>
        </div>
      </div>
      <div className='flex flex-col space-y-8 py-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Features</h2>
          <h3 className='text-center text-xl font-bold'>機能一覧</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8 md:grid-cols-2'></div>
      </div>
      <div className='flex flex-col space-y-8 bg-primary py-8 text-background'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Case</h2>
          <h3 className='text-center text-xl font-bold'>導入事例</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8 md:grid-cols-2'></div>
      </div>
      <div className='flex flex-col space-y-8 py-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-4xl font-bold'>Flow</h2>
          <h3 className='text-center text-xl font-bold'>導入まで</h3>
        </div>
        <div className='mx-4 grid grid-cols-1 gap-8 md:grid-cols-2'></div>
      </div>
    </div>
  )
}
