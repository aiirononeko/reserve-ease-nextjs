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
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { createReservation } from './action'
import { createReservationSchema } from './schema'

interface Props {
  initialDate: Date
  initialTime: string
  user: AuthUser
  onClose: () => void
}

export const ReservationCreateForm = ({
  initialDate,
  initialTime,
  user,
  onClose,
}: Props) => {
  const form = useForm<z.infer<typeof createReservationSchema>>({
    defaultValues: {
      date: initialDate.toISOString().split('T')[0],
      start_time: initialTime,
      end_time: '',
      store_id: user.user_metadata.store_id.toString(),
      user_id: user.id,
      customer_id: undefined,
      menu_id: undefined,
    },
    resolver: zodResolver(createReservationSchema),
  })

  const onSubmit = async (values: z.infer<typeof createReservationSchema>) => {
    try {
      await createReservation(values)
      onClose()
      toast.success('予約を作成しました')
    } catch (e) {
      toast.error('予約の作成に失敗しました')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                予約日時
              </FormLabel>
              <FormControl>
                <Input {...field} type='date' />
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
              <FormLabel aria-required={true} className='font-bold'>
                予約開始時刻
              </FormLabel>
              <FormControl>
                <Input {...field} type='time' />
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
              <FormLabel aria-required={true} className='font-bold'>
                予約終了時刻
              </FormLabel>
              <FormControl>
                <Input {...field} type='time' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='menu_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>メニュー</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customer_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>顧客情報</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='w-full font-bold'
        >
          {form.formState.isSubmitting ? (
            <Loader2 className='mr-2 size-4 animate-spin' />
          ) : (
            <>作成</>
          )}
        </Button>
      </form>
    </Form>
  )
}
