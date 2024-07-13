import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getStore } from './data'

export default async function Page({ params }: { params: { id: string } }) {
  const store = await getStore(Number(params.id))

  return (
    <div>
      {store.icon_url && (
        <div className='relative h-[320px] w-full bg-red-900'>
          <Image
            src={store.icon_url}
            className='object-cover'
            fill={true}
            alt={`${store.name}のアイコン`}
          />
        </div>
      )}
      <div className='mx-4 mt-6 space-y-6'>
        <p className='text-2xl font-bold'>{store.name}</p>
        <p className=''>{store.description}</p>
        <Button asChild className='w-full'>
          <Link href={`/reservation/staffs?store_id=${store.id}`}>
            スタッフを指名して予約する
            <ChevronRight className='ml-1' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
