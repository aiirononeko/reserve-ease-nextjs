import { getStore } from './data'
import { Store } from './store'

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const store = await getStore(Number(searchParams.store_id))

  return {
    title: `${store.name}の予約ページ | ReserveEase`,
    descripton: `${store.name}のご予約はこちらからどうぞ。ログイン不要で今すぐご予約いただけます。`,
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const store = await getStore(Number(searchParams.store_id))

  return (
    <div>
      <Store store={store} />
    </div>
  )
}
