'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { createMenu } from './action'
import { createMenuSchema } from './schema'

interface Props {
  user: AuthUser
}

export const MenuForm = ({ user }: Props) => {
  const form = useForm<z.infer<typeof createMenuSchema>>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      name: '',
      description: '',
      amount: undefined,
      discount: '0',
      user_id: user.id,
    },
  })

  const onSubmit = async (values: z.infer<typeof createMenuSchema>) => {
    await createMenu(values)
    toast.success('メニューを作成しました')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>メニュー名</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel className='font-bold'>サービス内容</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>価格(税込)</FormLabel>
              <FormControl>
                <Input type='number' placeholder='3000' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='discount'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>割引価格(税込)</FormLabel>
              <FormControl>
                <Input type='number' placeholder='500' {...field} />
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
            <>作成</>
          )}
        </Button>
      </form>
    </Form>
  )
}
