import { Article } from './article'
import { getArticle } from './data'

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  const article = await getArticle(params.id)
  return {
    title: `${article.metaTitle} | ReserveEase`,
    descripton: article.metaDescription,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  return (
    <div className='mx-4 items-center py-8'>
      <Article article={article} />
    </div>
  )
}
