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
import ImageSelector from '@/components/ui/image-selector'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Database } from '@/types/supabase'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateProfile } from './action'
import { profileSchema } from './schema'

interface Props {
  user: Database['public']['Tables']['users']['Row']
}

export const ProfileForm = ({ user }: Props) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      id: user.id,
      name: user.name ?? '',
      icon_url: user.icon_url ?? '',
      profile: user.profile ?? '',
    },
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateProfile(values)
      toast.success('プロフィールを更新しました')
    } catch (e) {
      toast.error('プロフィールの更新に失敗しました')
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
                氏名
              </FormLabel>
              <FormControl>
                <Input placeholder='予約 太郎' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='icon_url'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel aria-required={true} className='font-bold'>
                アイコン
              </FormLabel>
              <FormControl>
                <ImageSelector
                  width='180px'
                  resultWidth={180}
                  aspectRatio={180 / 240}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='profile'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                プロフィール
              </FormLabel>
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
        <Button
          type='submit'
          disabled={
            !form.formState.isValid ||
            // !form.formState.isDirty ||
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
