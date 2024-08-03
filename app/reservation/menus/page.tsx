import { getMenus, getStaff } from './data'
import { MenuCard } from './menu-card'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const staffId = searchParams.staff_id ?? undefined
  const menus = staffId ? await getMenus(staffId) : undefined
  const staff = staffId ? await getStaff(staffId) : undefined

  return (
    <div className='mx-4 flex flex-col items-center py-8'>
      {menus ? (
        <div className='w-full space-y-2'>
          {menus.map((menu) => {
            return <MenuCard key={menu.id} menu={menu} staff={staff} />
          })}
        </div>
      ) : (
        <p>予約可能なメニューがありません</p>
      )}
    </div>
  )
}
