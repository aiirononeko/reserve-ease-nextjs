import { date, format } from '@formkit/tempo'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  article: Article
}

export const ArticleCard = ({ article }: Props) => {
  const createdAt = format({
    date: date(article.createdAt),
    format: 'YYYY/MM/DD',
  })

  return (
    <Link href={`/articles/${article.id}`}>
      <div className='border border-primary'>
        <div className='relative h-48 w-full'>
          <Image
            src={article.eyecatch.url}
            alt={`${article.title}のアイキャッチ`}
            fill={true}
          />
        </div>
        <div className='space-y-2 p-4'>
          <p className='font-bold tracking-wide'>{article.title}</p>
          <p className='text-sm tracking-wide'>{createdAt}</p>
        </div>
      </div>
    </Link>
  )
}
