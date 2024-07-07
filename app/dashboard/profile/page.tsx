import { getUser } from './data'
import { ProfileForm } from './profile-form'

export default async function Page() {
  const user = await getUser()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-semibold'>プロフィール管理</h1>
      <div className='w-full px-4'>{user && <ProfileForm user={user} />}</div>
    </div>
  )
}
