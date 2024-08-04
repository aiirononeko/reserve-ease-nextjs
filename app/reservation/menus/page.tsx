import { getMenus, getStaff, getStore } from './data'
import { MenuCard } from './menu-card'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const storeId = Number(searchParams.store_id) ?? undefined
  const staffId = searchParams.staff_id ?? undefined
  const store = storeId ? await getStore(storeId) : undefined
  const menus = staffId ? await getMenus(staffId) : undefined
  const staff = staffId ? await getStaff(staffId) : undefined

  return (
    <div className='mx-4 flex flex-col items-center py-8'>
      {menus ? (
        <div className='w-full space-y-2'>
          {menus.map((menu) => {
            return (
              <MenuCard key={menu.id} store={store} menu={menu} staff={staff} />
            )
          })}
        </div>
      ) : (
        <p>予約可能なメニューがありません</p>
      )}
    </div>
  )
}
