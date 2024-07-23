'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { Database } from '@/types/supabase'
import { addHour, format } from '@formkit/tempo'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@supabase/supabase-js'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { createReservation } from './action'
import { createReservationSchema } from './schema'

interface Props {
  initialDate: Date
  user: AuthUser
  menus: Database['public']['Tables']['menus']['Row'][]
  onClose: () => void
}

export const ReservationCreateForm = ({
  initialDate,
  user,
  menus,
  onClose,
}: Props) => {
  const form = useForm<z.infer<typeof createReservationSchema>>({
    defaultValues: {
      start_datetime: format({
        date: initialDate,
        format: 'YYYY-MM-DDTHH:mm',
      }),
      end_datetime: format({
        date: addHour(initialDate, 1),
        format: 'YYYY-MM-DDTHH:mm',
      }),
      store_id: user.user_metadata.store_id.toString(),
      user_id: user.id,
      menu_id: undefined,
      customer_name: undefined,
      customer_phone_number: undefined,
      customer_email: undefined,
    },
    resolver: zodResolver(createReservationSchema),
  })

  const menuOptions = menus.map((menu) => {
    return {
      label: menu.name,
      value: menu.id.toString(),
    }
  })

  const onSubmit = async (values: z.infer<typeof createReservationSchema>) => {
    try {
      await createReservation(values)
      onClose()
      toast.success('予約を作成しました')
    } catch (e) {
      toast.error('予約の作成に失敗しました')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='start_datetime'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                予約開始時刻
              </FormLabel>
              <FormControl>
                <Input {...field} type='datetime-local' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='end_datetime'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                予約終了時刻
              </FormLabel>
              <FormControl>
                <Input {...field} type='datetime-local' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='menu_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required={true} className='font-bold'>
                メニュー
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-80 justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? menuOptions.find(
                            (option) => option.value === field.value,
                          )?.label
                        : '選択してください'}
                      <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent {...field} side='top' className='w-80 p-0'>
                  <Command>
                    <CommandInput placeholder='メニュー名で検索' />
                    <CommandEmpty className='py-2 text-center text-xs'>
                      メニューが見つかりません
                    </CommandEmpty>
                    <CommandGroup className='h-80 overflow-auto'>
                      {menuOptions.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            form.setValue('menu_id', option.value)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              option.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customer_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>お客様氏名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customer_phone_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>お客様電話番号</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customer_email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>お客様メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
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
