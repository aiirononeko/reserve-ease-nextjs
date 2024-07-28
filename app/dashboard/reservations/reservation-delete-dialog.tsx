import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import type { Database } from '@/types/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { deleteReservation } from './action'
import { deleteReservationSchema } from './schema'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
  closeModal: () => void
}

export const ReservationDeleteDialog = ({ reservation, closeModal }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof deleteReservationSchema>>({
    defaultValues: {
      id: String(reservation.id),
    },
    resolver: zodResolver(deleteReservationSchema),
  })

  const onSubmit = async (values: z.infer<typeof deleteReservationSchema>) => {
    try {
      await deleteReservation(values)
      setOpen(false)
      closeModal()
      toast.success('予約を削除しました')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('予約の削除に失敗しました')
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='ghost'>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className='space-y-4 pt-14'>
        <DialogHeader>
          <DialogTitle>
            {/* @ts-expect-error because JOINした時の型定義あとでやる */}
            {reservation.customers.name
              ? // @ts-expect-error because JOINした時の型定義あとでやる
                reservation.customers.name
              : '顧客氏名未入力'}{' '}
            様の予約を削除しますか？
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFooter className='flex flex-row justify-end gap-4'>
              <Button variant='destructive' type='submit'>
                削除
              </Button>
              <DialogClose asChild>
                <Button variant='outline'>キャンセル</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
