import { checkAuth } from '@/app/dashboard/auth'
import { InviteStaffForm } from './invite-staff-form'

export default async function Page() {
  const user = await checkAuth()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 px-4 py-8'>
      <h1 className='text-xl font-bold'>新しいスタッフを招待</h1>
      <InviteStaffForm user={user} />
    </div>
  )
}
