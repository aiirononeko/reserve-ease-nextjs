'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import type { Database } from '@/types/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { deleteMenu } from './action'
import { deleteMenuSchema } from './schema'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
}

export const MenuDeleteDialog = ({ menu }: Props) => {
  const form = useForm<z.infer<typeof deleteMenuSchema>>({
    resolver: zodResolver(deleteMenuSchema),
    defaultValues: {
      id: menu.id,
    },
  })

  const onSubmit = async (values: z.infer<typeof deleteMenuSchema>) => {
    await deleteMenu(values)
    toast.success('メニューを削除しました')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col items-center space-y-8'
          >
            <DialogHeader>
              <DialogDescription>
                {menu.name}を削除します。
                <br />
                よろしいですか？
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex flex-row justify-center space-x-4'>
              <DialogClose asChild>
                <Button variant='outline' className='w-28 font-bold'>
                  キャンセル
                </Button>
              </DialogClose>
              <Button
                type='submit'
                variant='destructive'
                disabled={!form.formState.isValid || form.formState.isLoading}
                className='w-28 font-bold'
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className='mr-2 size-4 animate-spin' />
                ) : (
                  <>削除する</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
