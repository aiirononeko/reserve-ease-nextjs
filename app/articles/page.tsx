import type { Metadata } from 'next'
import { ArticleCard } from './article-card'
import { getArticles } from './data'

export const metadata: Metadata = {
  title: '記事一覧 | ReserveEase',
  description:
    'フリーランスや個人店向けの予約システム導入方法や知っておくべき知識などを紹介しています。',
}

export default async function Page() {
  const articles = await getArticles()

  return (
    <div className='mx-4 items-center space-y-4 py-8'>
      <div className='space-y-1'>
        <h1 className='text-center text-2xl font-bold'>Articles</h1>
        <p className='text-center text-xs'>記事一覧</p>
      </div>
      <div className='space-y-4'>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
