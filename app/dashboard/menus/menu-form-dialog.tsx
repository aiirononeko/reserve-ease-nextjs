'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { updateMenu } from './action'
import { updateMenuSchema } from './schema'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
}

export const MenuFormDialog = ({ menu }: Props) => {
  const form = useForm<z.infer<typeof updateMenuSchema>>({
    resolver: zodResolver(updateMenuSchema),
    defaultValues: {
      id: menu.id,
      name: menu.name,
      description: menu.description,
      amount: menu.amount.toString(),
      discount: menu.discount.toString(),
    },
  })

  const onSubmit = async (values: z.infer<typeof updateMenuSchema>) => {
    await updateMenu(values)
    toast.success('メニューを更新しました')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-28'>編集</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>プランを編集</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-8'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メニュー名</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
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
                  <FormLabel>サービス内容</FormLabel>
                  <FormControl>
                    <Textarea placeholder='shadcn' {...field} />
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
                  <FormLabel>価格(税込)</FormLabel>
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
                  <FormLabel>割引価格(税込)</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='500' {...field} />
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
      </DialogContent>
    </Dialog>
  )
}
