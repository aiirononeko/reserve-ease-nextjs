interface Case {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  thumbnail: {
    url: string
    height: number
    width: number
  }
  thumbnailAlt: string
  region: string
  company: string
}

interface Response {
  contents: Case[]
  totalCount: number
  offset: number
  limit: number
}
