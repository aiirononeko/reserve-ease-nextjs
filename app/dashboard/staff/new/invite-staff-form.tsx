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
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { inviteStaff } from './action'
import { inviteStaffSchema } from './schema'

interface Props {
  user: AuthUser
}

export const InviteStaffForm = ({ user }: Props) => {
  const form = useForm<z.infer<typeof inviteStaffSchema>>({
    resolver: zodResolver(inviteStaffSchema),
    defaultValues: {
      name: '',
      email: '',
      store_id: user.user_metadata.store_id.toString(),
    },
  })

  const onSubmit = async (values: z.infer<typeof inviteStaffSchema>) => {
    await inviteStaff(values)
    toast.success('スタッフを招待しました')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>氏名</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel className='font-bold'>メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} />
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
            <>招待</>
          )}
        </Button>
      </form>
    </Form>
  )
}
