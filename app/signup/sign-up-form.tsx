'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signUp } from './action'
import { signUpSchema } from './schema'

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      await signUp(values)
      toast.success('ユーザー登録が完了しました')
    } catch (e) {
      toast.error('ユーザー登録に失敗しました')
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
                <Input type='text' placeholder='Reserve Taro' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='storeName'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                店舗名
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='Salon Reserve' {...field} />
              </FormControl>
              <FormDescription>後ほど変更が可能です</FormDescription>
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
                <Input
                  type='email'
                  placeholder='resa@reserve-ease.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                パスワード
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='********'
                  {...field}
                  className='placeholder:text-xs placeholder:tracking-widest'
                />
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
            <>この内容で登録する</>
          )}
        </Button>
      </form>
    </Form>
  )
}
