'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import { addHour, date, format } from '@formkit/tempo'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateReservation } from './action'
import { updateReservationSchema } from './schema'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
}

export const ReservationUpdateForm = ({ reservation }: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof updateReservationSchema>>({
    defaultValues: {
      id: reservation.id,
      start_datetime: format({
        date: addHour(date(reservation.start_datetime), 9),
        format: 'YYYY-MM-DDTHH:mm',
      }),
      end_datetime: format({
        date: addHour(date(reservation.end_datetime), 9),
        format: 'YYYY-MM-DDTHH:mm',
      }),
      store_id: String(reservation.store_id),
    },
    resolver: zodResolver(updateReservationSchema),
  })

  const onSubmit = async (values: z.infer<typeof updateReservationSchema>) => {
    try {
      await updateReservation({
        ...values,
        start_datetime: date(values.start_datetime).toISOString(),
        end_datetime: date(values.end_datetime).toISOString(),
      })
      router.push('/dashboard/reservations')
      toast.success('予約内容を変更しました')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('予約の変更に失敗しました')
      }
    }
  }

  // @ts-expect-error because JOINした時の型定義あとでやる
  const { customers, menus, users } = reservation

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='start_datetime'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                予約開始時刻
              </FormLabel>
              <FormControl>
                <Input {...field} type='datetime-local' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='end_datetime'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                予約終了時刻
              </FormLabel>
              <FormControl>
                <Input {...field} type='datetime-local' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid w-full grid-cols-2 border p-4 text-start'>
          <div className='col-span-1 space-y-4'>
            <p>メニュー</p>
            <p>担当スタッフ</p>
            <p>お客様氏名</p>
            <p>お客様電話番号</p>
            <p>お客様メールアドレス</p>
          </div>
          <div className='col-span-1 space-y-4 text-primary'>
            <p>{menus.name}</p>
            <p>{users.name}</p>
            {customers.name ? <p>{customers.name}</p> : <p>未入力</p>}
            {customers.phone_number ? (
              <p>{customers.phone_number}</p>
            ) : (
              <p>未入力</p>
            )}
            {customers.email ? <p>{customers.email}</p> : <p>未入力</p>}
          </div>
        </div>
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
            <>変更</>
          )}
        </Button>
      </form>
    </Form>
  )
}
