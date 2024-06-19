import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'トップページ | ReserveEase',
  description:
    'ReserveEase(リザーブイーズ)は、シンプルで使いやすい予約管理サービスです。',
}

export default function Page() {
  return (
    <div className='mx-4 my-6 flex flex-col items-center space-y-8 bg-card px-6 py-8'>
      <h1 className='text-xl font-semibold'>ユーザー用トップページ</h1>
    </div>
  )
}
