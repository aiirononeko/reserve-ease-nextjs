interface Article {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  eyecatchAlt: string
  category: string[] | null
  metaTitle: string
  metaDescription: string
}

interface ArticleResponse {
  contents: Article[]
  totalCount: number
  offset: number
  limit: number
}
