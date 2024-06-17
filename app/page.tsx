import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'トップページ | ReserveEase',
  description:
    'ReserveEase(リザーブイーズ)は、シンプルで使いやすい予約管理サービスです。',
}

export default function Page() {
  return <h1>TOP</h1>
}
