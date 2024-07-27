import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Database } from '@/types/supabase'
import { ReservationCreateForm } from './reservation-create-form'

interface Props {
  date: Date
  userId: string
  storeId: number
  menus: Database['public']['Tables']['menus']['Row'][]
}

export function EmptyCard({ date, userId, storeId, menus }: Props) {
  return (
    <Dialog>
      <DialogTrigger className='h-20 w-full'>
        <div className='h-20 w-full border-r'></div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mt-2 space-y-10'>
          <DialogTitle>予約作成</DialogTitle>
          <DialogDescription className='text-primary'>
            <ReservationCreateForm
              initialDate={date}
              userId={userId}
              storeId={storeId}
              menus={menus}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  )
}
