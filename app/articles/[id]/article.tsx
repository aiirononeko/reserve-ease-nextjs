import { Button } from '@/components/ui/button'
import { date, format } from '@formkit/tempo'
import parse from 'html-react-parser'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './article.module.scss'

interface Props {
  article: Article
}

export const Article = ({ article }: Props) => {
  const createdAt = format({
    date: date(article.createdAt),
    format: 'YYYY/MM/DD',
  })

  return (
    <div className='tracking-wide'>
      <h1>{article.title}</h1>
      <p>{createdAt}</p>
      <div className='relative h-48 w-full'>
        <Image
          src={article.eyecatch.url}
          alt={article.eyecatchAlt}
          fill={true}
        />
      </div>
      <div className={styles.content}>{parse(article.content)}</div>
      <Button asChild className='w-full'>
        <Link href='/'>
          初月無料でReserveEaseをはじめる
          <ChevronRight className='ml-1' />
        </Link>
      </Button>
    </div>
  )
}
