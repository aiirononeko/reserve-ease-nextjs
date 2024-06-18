import { BusinessHourForm } from './business-hours-form'
import { getBusinessHours } from './data'

export default async function Page() {
  const businessHours = await getBusinessHours(1)

  return (
    <div className='mx-4 mt-8 flex flex-col items-center space-y-8 bg-card px-6 py-10'>
      <h1 className='text-xl font-bold'>営業時間管理</h1>
      {businessHours && (
        <>
          {businessHours.map((businessHour) => (
            <BusinessHourForm
              key={businessHour.id}
              businessHour={businessHour}
            />
          ))}
        </>
      )}
    </div>
  )
}
