import { getStaffs } from './data'
import { StaffCard } from './staff-card'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const staffs = await getStaffs(Number(searchParams.store_id))

  return (
    <div className='mx-4 flex flex-col items-center py-8'>
      {staffs ? (
        <div className='w-full space-y-2'>
          {staffs.map((staff) => {
            return <StaffCard key={staff.id} staff={staff} />
          })}
        </div>
      ) : (
        <p>この店舗にはスタッフがいません</p>
      )}
    </div>
  )
}
