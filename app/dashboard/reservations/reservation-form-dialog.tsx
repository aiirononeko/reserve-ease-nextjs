'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Database } from '@/types/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { updateReservation } from './action'
import { updateReservationSchema } from './schema'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
}

export const ReservationFormDialog = ({ reservation }: Props) => {
  const form = useForm<z.infer<typeof updateReservationSchema>>({
    resolver: zodResolver(updateReservationSchema),
    defaultValues: {
      id: reservation.id,
      reservation_date: reservation.reservation_date,
      start_time: reservation.start_time,
      end_time: reservation.end_time,
    },
  })

  const onSubmit = async (values: z.infer<typeof updateReservationSchema>) => {
    await updateReservation(values)
    toast.success('予約を更新しました')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-28'>編集</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>予約を編集</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-8'
          >
            <FormField
              control={form.control}
              name='reservation_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>予約日</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='start_time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>予約開始時間</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>予約終了時間</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={
                !form.formState.isValid ||
                !form.formState.isDirty ||
                form.formState.isLoading
              }
              className='w-full font-bold'
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='mr-2 size-4 animate-spin' />
              ) : (
                <>更新</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
