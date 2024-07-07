import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import { getAllStaff } from './data'
import { StaffTable } from './staff-table'

export default async function Page() {
  const allStaff = await getAllStaff()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-8'>
      <h1 className='text-xl font-bold'>スタッフ管理</h1>
      <div className='w-full space-y-2'>
        <div className='flex items-center justify-center rounded border border-dotted border-primary bg-card'>
          <Button variant='link' asChild>
            <Link href='/dashboard/staff/new' className='text-xs'>
              <CirclePlus className='pr-1' />
              スタッフを追加する
            </Link>
          </Button>
        </div>
        <StaffTable allStaff={allStaff} />
      </div>
    </div>
  )
}
