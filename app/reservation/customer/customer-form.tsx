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
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { reservationAtom } from '../jotai'
import { createCustomer } from './action'
import { customerSchema } from './schema'

export const CustomerForm = () => {
  const router = useRouter()
  const [reservation, setReservation] = useAtom(reservationAtom)

  const form = useForm<z.infer<typeof customerSchema>>({
    defaultValues: {
      store_id: reservation.store.id,
    },
    resolver: zodResolver(customerSchema),
  })

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    const customer = await createCustomer(values)

    if (customer) {
      setReservation({
        ...reservation,
        customer,
      })
      router.push('/reservation/confirm')
    } else {
      toast.error('もう一度情報を入力して送信してください')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                お名前
              </FormLabel>
              <FormControl>
                <Input placeholder='予約 太郎' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                お電話番号
              </FormLabel>
              <FormControl>
                <Input placeholder='08012345678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                メールアドレス
              </FormLabel>
              <FormControl>
                <Input placeholder='reserve@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isLoading}
          className='w-full font-bold'
        >
          {form.formState.isSubmitting ? (
            <Loader2 className='mr-2 size-4 animate-spin' />
          ) : (
            <>予約内容を確認</>
          )}
        </Button>
      </form>
    </Form>
  )
}
