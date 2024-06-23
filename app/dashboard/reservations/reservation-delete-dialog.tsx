'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import type { Database } from '@/types/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { deleteReservation } from './action'
import { deleteReservationSchema } from './schema'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
}

export const ReservationDeleteDialog = ({ reservation }: Props) => {
  const form = useForm<z.infer<typeof deleteReservationSchema>>({
    resolver: zodResolver(deleteReservationSchema),
    defaultValues: {
      id: reservation.id,
    },
  })

  const onSubmit = async (values: z.infer<typeof deleteReservationSchema>) => {
    await deleteReservation(values)
    toast.success('予約を削除しました')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col items-center space-y-8'
          >
            <DialogHeader>
              <DialogDescription>
                予約を削除します。
                <br />
                よろしいですか？
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex flex-row justify-center space-x-4'>
              <DialogClose asChild>
                <Button variant='outline' className='w-28 font-bold'>
                  キャンセル
                </Button>
              </DialogClose>
              <Button
                type='submit'
                variant='destructive'
                disabled={!form.formState.isValid || form.formState.isLoading}
                className='w-28 font-bold'
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className='mr-2 size-4 animate-spin' />
                ) : (
                  <>削除する</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
