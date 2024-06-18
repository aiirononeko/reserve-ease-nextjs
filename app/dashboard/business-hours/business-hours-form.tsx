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
import { toast } from 'sonner'
import { businessHourSchema } from './schema'

interface Props {
  businessHour: Database['public']['Tables']['business_hours']['Row']
}

export const BusinessHourForm = ({ businessHour }: Props) => {
  const form = useForm<z.infer<typeof businessHourSchema>>({
    defaultValues: {
      id: businessHour.id,
      open_time: businessHour.open_time ?? undefined,
      close_time: businessHour.close_time ?? undefined,
      store_id: businessHour.store_id,
    },
    resolver: zodResolver(businessHourSchema),
  })

  const onSubmit = async (values: z.infer<typeof businessHourSchema>) => {
    // await updateStore(values)
    toast.success('営業時間を更新しました！')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='open_time'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>オープン時間</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='close_time'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>クローズ時間</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
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
          更新
        </Button>
      </form>
    </Form>
  )
}
