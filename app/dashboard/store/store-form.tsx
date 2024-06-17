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
import { updateStore } from './action'
import { storeSchema } from './schema'

interface Props {
  store: Database['public']['Tables']['stores']['Row']
}

export const StoreForm = ({ store }: Props) => {
  const form = useForm<z.infer<typeof storeSchema>>({
    defaultValues: {
      id: store.id,
      name: store.name,
      post_code: store.post_code ?? '',
      address: store.address ?? '',
      phone_number: store.phone_number ?? '',
    },
    resolver: zodResolver(storeSchema),
  })

  const onSubmit = async (values: z.infer<typeof storeSchema>) => {
    await updateStore(values)
    toast.success('店舗情報を更新しました！')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>店舗名</FormLabel>
              <FormControl>
                <Input placeholder='サンプル屋' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='post_code'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>店舗郵便番号</FormLabel>
              <FormControl>
                <Input placeholder='111-1234' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>店舗所在地</FormLabel>
              <FormControl>
                <Input
                  placeholder='〒105-0011 東京都港区芝公園4丁目2-8 東京タワー'
                  {...field}
                />
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
              <FormLabel className='font-bold'>店舗電話番号</FormLabel>
              <FormControl>
                <Input placeholder='08012345678' {...field} />
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
