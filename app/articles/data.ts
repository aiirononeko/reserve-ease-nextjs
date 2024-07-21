import { createClient } from '@/lib/microcms'

export const getArticles = async (): Promise<Article[]> => {
  const microcms = createClient()

  const { contents } = await microcms.get({
    endpoint: 'articles',
  })
  return contents
}
