import { redirect } from 'next/navigation'
import DateSelector from './date-selector'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { staff_id, menu_id } = searchParams
  if (!staff_id || !menu_id) {
    redirect('/')
  }

  return (
    <div className='mx-4 flex flex-col items-center py-8'>
      <DateSelector staffId={staff_id} menuId={Number(menu_id)} />
    </div>
  )
}
