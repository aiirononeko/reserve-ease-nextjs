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
import { useRouter } from 'next/navigation'
import { ownerInvitationSchema } from './schema'

interface Props {
  ownerRoleId: number
}

export const OwnerInvitationForm = ({ ownerRoleId }: Props) => {
  const form = useForm<z.infer<typeof ownerInvitationSchema>>({
    defaultValues: {
      role_id: ownerRoleId,
    },
    resolver: zodResolver(ownerInvitationSchema),
  })

  const router = useRouter()

  const onSubmit = (values: z.infer<typeof ownerInvitationSchema>) => {
    // TODO
    router.push('/dashboard')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='owner_email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='info@hogehoge.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='store_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>店舗名</FormLabel>
              <FormControl>
                <Input placeholder='東京ストア' {...field} />
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
          オーナーを招待
        </Button>
      </form>
    </Form>
  )
}
