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
  FormDescription,
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { updateMenu } from './action'
import { updateMenuSchema } from './schema'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
}

export const MenuFormDialog = ({ menu }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof updateMenuSchema>>({
    resolver: zodResolver(updateMenuSchema),
    defaultValues: {
      id: menu.id,
      name: menu.name,
      description: menu.description,
      amount: menu.amount.toString(),
      discount: menu.discount.toString(),
      minutes: menu.minutes.toString(),
    },
  })

  const onSubmit = async (values: z.infer<typeof updateMenuSchema>) => {
    await updateMenu(values)
    setOpen(false)
    toast.success('メニューを更新しました')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='h-10 w-20 text-xs'>編集</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className='max-h-[90%] overflow-hidden'
      >
        <DialogHeader className='my-4'>
          <DialogTitle>メニューを編集</DialogTitle>
        </DialogHeader>
        <div className='dialog-scroll overflow-y-scroll px-4'>
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
                    <FormLabel aria-required={true} className='font-bold'>
                      メニュー名
                    </FormLabel>
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
                    <FormLabel aria-required={true} className='font-bold'>
                      サービス内容
                    </FormLabel>
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
                    <FormLabel aria-required={true} className='font-bold'>
                      価格(税込)
                    </FormLabel>
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
                    <FormLabel aria-required={true} className='font-bold'>
                      割引価格(税込)
                    </FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='500' {...field} />
                    </FormControl>
                    <FormDescription>
                      0以上の数値を設定すると、割引価格が表示されます。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='minutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required={true} className='font-bold'>
                      所要時間(目安)(分)
                    </FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='60' {...field} />
                    </FormControl>
                    <FormDescription>
                      分単位で入力してください。例: 1時間の場合→60
                    </FormDescription>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
