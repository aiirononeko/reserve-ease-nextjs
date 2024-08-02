import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Database } from '@/types/supabase'
import { useState } from 'react'
import { ReservationCreateForm } from './reservation-create-form'

interface Props {
  date: Date
  staffId: string
  storeId: number
  menus: Database['public']['Tables']['menus']['Row'][]
}

export function EmptyCard({ date, staffId, storeId, menus }: Props) {
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='h-20 w-full'>
        <div className='h-20 w-full border-r'></div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className='max-h-[90%] overflow-hidden'
      >
        <DialogHeader className='my-4'>
          <DialogTitle>予約作成</DialogTitle>
        </DialogHeader>
        <div className='dialog-scroll overflow-y-scroll px-4'>
          <ReservationCreateForm
            initialDate={date}
            staffId={staffId}
            storeId={storeId}
            menus={menus}
            closeModal={closeModal}
          />
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  )
}
