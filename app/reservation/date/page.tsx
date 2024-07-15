import { getBusinessHours } from './data'
import DateSelector from './date-selector'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const businessHours = await getBusinessHours(Number(searchParams.store_id))

  return (
    <div className='mx-4 flex flex-col items-center py-8'>
      <DateSelector businessHours={businessHours} />
    </div>
  )
}
