import { getUser } from '@/app/data'
import type { Metadata } from 'next'
import { Calender } from './calender'
import { getMenus, getStore } from './data'

export const metadata: Metadata = {
  robots: {
    googleBot: {
      index: false,
    },
  },
}

export default async function Page() {
  const store = await getStore()
  const menus = await getMenus()
  const user = await getUser()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-4'>
      <Calender store={store} menus={menus} userId={user.id} />
    </div>
  )
}
