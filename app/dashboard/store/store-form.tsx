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
import { Textarea } from '@/components/ui/textarea'
import type { Database } from '@/types/supabase'
import { Loader2 } from 'lucide-react'
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
      description: store.description ?? '',
      post_code: store.post_code ?? '',
      address: store.address ?? '',
      phone_number: store.phone_number ?? '',
      max_reservation_count: store.max_reservation_count.toString(),
    },
    resolver: zodResolver(storeSchema),
  })

  const onSubmit = async (values: z.infer<typeof storeSchema>) => {
    try {
      await updateStore(values)
      toast.success('店舗情報を更新しました')
    } catch (e) {
      toast.error('店舗情報の更新に失敗しました')
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>店舗説明</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='私たちの整体院では、経験豊富な施術師が一人ひとりに合わせたケアを提供します。'
                  {...field}
                />
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
        <FormField
          control={form.control}
          name='max_reservation_count'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>同時予約可能数</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
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
  )
}
