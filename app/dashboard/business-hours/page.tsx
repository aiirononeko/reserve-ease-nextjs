import { BusinessHoursForm } from './business-hours-form'
import { getBusinessHours } from './data'

export default async function Page() {
  const businessHours = await getBusinessHours()

  return (
    <div className='mx-4 flex flex-col items-center space-y-8 py-8'>
      <h1 className='text-xl font-bold'>営業時間管理</h1>
      <div className='w-full px-4'>
        {businessHours && <BusinessHoursForm businessHours={businessHours} />}
      </div>
    </div>
  )
}
