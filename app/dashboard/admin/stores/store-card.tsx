import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Database } from '@/types/supabase'
import { getStoreOwner } from './data'

interface Props {
  store: Database['public']['Tables']['stores']['Row']
}

export const StoreCard = async ({ store }: Props) => {
  const storeOwner = await getStoreOwner(store.id)

  return (
    <Card className='w-80'>
      <CardHeader>
        <CardTitle>{store.name}</CardTitle>
        <CardDescription>
          {store.address ?? '住所が登録されていません'}
        </CardDescription>
      </CardHeader>
      <CardContent className='text-md'>
        {store.description ? (
          <p>{store.description}</p>
        ) : (
          <p className='text-xs text-muted-foreground'>
            詳細が登録されていません
          </p>
        )}
      </CardContent>
      <CardFooter>
        {storeOwner && storeOwner.email && <p>{storeOwner.email}</p>}
      </CardFooter>
    </Card>
  )
}
