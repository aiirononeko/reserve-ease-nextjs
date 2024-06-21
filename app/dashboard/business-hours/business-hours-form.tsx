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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Database } from '@/types/supabase'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateBusinessHours } from './action'
import { DAYS } from './constants'
import { businessHoursSchema } from './schema'

interface Props {
  businessHours: Database['public']['Tables']['business_hours']['Row'][]
}

export const BusinessHourForm = ({ businessHours }: Props) => {
  const form = useForm<z.infer<typeof businessHoursSchema>>({
    defaultValues: {
      businessHours: businessHours.map((businesshour) => {
        return {
          id: businesshour.id,
          open_time: businesshour.open_time ?? undefined,
          close_time: businesshour.close_time ?? undefined,
        }
      }),
    },
    resolver: zodResolver(businessHoursSchema),
  })

  const onSubmit = async (values: z.infer<typeof businessHoursSchema>) => {
    await updateBusinessHours(values)
    toast.success('営業時間を更新しました！')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        {businessHours.map((businessHour, index) => (
          <div
            key={businessHour.id}
            className='flex flex-row items-center justify-between'
          >
            <label className='flex size-10 items-center justify-center rounded bg-primary font-bold text-primary-foreground'>
              {DAYS[businessHour.day_of_week]}
            </label>
            <div className='flex flex-row items-center space-x-2'>
              <FormField
                control={form.control}
                name={`businessHours.${index}.open_time`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-[120px]' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className='text-xl text-muted-foreground'>~</p>
              <FormField
                control={form.control}
                name={`businessHours.${index}.close_time`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-[120px]' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
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
