import { Button } from '@/components/ui/button'
import type { Database } from '@/types/supabase'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  staff: Database['public']['Tables']['users']['Row']
}

export const StaffCard = ({ staff }: Props) => {
  return (
    <div className='grid h-[156px] w-full grid-cols-3 border border-primary'>
      <div className='relative bg-muted'>
        {staff.icon_url && (
          <Image
            src={staff.icon_url}
            fill={true}
            alt={`${staff.name}のアイコン`}
          />
        )}
      </div>
      <div className='col-span-2 space-y-3 p-4'>
        <div className='grid grid-cols-3'>
          <p className='col-span-2 text-lg font-bold'>{staff.name}</p>
          <Button asChild className='col-span-1 h-7 text-xs'>
            <Link href={`/reservation/menus?staff_id=${staff.id}`}>
              指名する
            </Link>
          </Button>
        </div>
        <p className='line-clamp-5 whitespace-pre-wrap text-xs'>
          {staff.profile}
        </p>
      </div>
    </div>
  )
}
