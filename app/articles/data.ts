import { createClient } from '@/lib/microcms'

export const getArticles = async (): Promise<Article[]> => {
  const microcms = createClient()

  const { contents } = await microcms.getList({
    endpoint: 'articles',
    customRequestInit: {
      next: { tags: ['articles'] },
    },
  })
  return contents
}
