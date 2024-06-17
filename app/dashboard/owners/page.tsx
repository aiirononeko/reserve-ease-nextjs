import { getOwnerRole } from './data'
import { OwnerInvitationForm } from './owner-invitation-form'

export default async function Page() {
  const ownerRole = await getOwnerRole()

  return (
    <div className='mx-4 mt-10 flex flex-col items-center space-y-8 bg-card px-6 py-10'>
      <h1 className='text-xl font-bold'>オーナー管理</h1>
      {ownerRole && <OwnerInvitationForm ownerRoleId={ownerRole.id} />}
    </div>
  )
}
