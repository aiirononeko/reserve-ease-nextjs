import { createClient } from '@/lib/microcms'

export const getArticle = async (articleId: string) => {
  const microcms = createClient()

  const result = await microcms.get({
    endpoint: 'articles',
    contentId: articleId,
    customRequestInit: {
      cache: 'no-store', // MEMO: MicroCMSの変更をwebhookで受け取るまではキャッシュ使わない
    },
  })
  return result
}
