import { createClient } from '@/lib/microcms'

export const getArticles = async (): Promise<Article[]> => {
  const microcms = createClient()

  const { contents } = await microcms.get({
    endpoint: 'articles',
    customRequestInit: {
      cache: 'no-store', // MEMO: MicroCMSの変更をwebhookで受け取るまではキャッシュ使わない
    },
  })
  return contents
}
