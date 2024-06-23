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

export const BusinessHoursForm = ({ businessHours }: Props) => {
  const form = useForm<z.infer<typeof businessHoursSchema>>({
    defaultValues: {
      businessHours: businessHours.map((businesshour) => {
        return {
          id: businesshour.id,
          open_time: businesshour.open_time ?? '',
          close_time: businesshour.close_time ?? '',
        }
      }),
    },
    resolver: zodResolver(businessHoursSchema),
  })

  const handleLabelClick = async (index: number, isDisabled: boolean) => {
    form.setValue(
      `businessHours.${index}.open_time`,
      isDisabled ? '' : '10:00',
      { shouldDirty: true },
    )
    form.setValue(
      `businessHours.${index}.close_time`,
      isDisabled ? '' : '18:00',
      {
        shouldDirty: true,
      },
    )

    // MEMO: watchしないとトグルがうまくいかないので記述
    form.watch(`businessHours.${index}.open_time`)
    form.watch(`businessHours.${index}.close_time`)
  }

  const onSubmit = async (values: z.infer<typeof businessHoursSchema>) => {
    await updateBusinessHours(values)
    toast.success('営業時間を更新しました！')
  }

  return (
    <Form {...form}>
      <p className='mb-4 text-xs'>
        曜日を選択すると、定休日と営業日を切り替えられます。
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        {businessHours.map((businessHour, index) => (
          <div
            key={businessHour.id}
            className='flex flex-row items-center justify-between'
          >
            {form.getValues(`businessHours.${index}.open_time`) === '' &&
            form.getValues(`businessHours.${index}.close_time`) === '' ? (
              <label
                onClick={() => handleLabelClick(index, false)}
                className='flex size-10 items-center justify-center rounded border border-dotted bg-background font-bold text-muted-foreground'
              >
                {DAYS[businessHour.day_of_week]}
              </label>
            ) : (
              <label
                onClick={() => handleLabelClick(index, true)}
                className='flex size-10 items-center justify-center rounded bg-primary font-bold text-primary-foreground'
              >
                {DAYS[businessHour.day_of_week]}
              </label>
            )}
            <div className='flex flex-row items-center space-x-2'>
              <FormField
                control={form.control}
                name={`businessHours.${index}.open_time`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          form.getValues(`businessHours.${index}.open_time`) ===
                            '' &&
                          form.getValues(
                            `businessHours.${index}.close_time`,
                          ) === ''
                        }
                        className='w-[120px] text-center'
                      />
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
                      <Input
                        {...field}
                        disabled={
                          form.getValues(`businessHours.${index}.open_time`) ===
                            '' &&
                          form.getValues(
                            `businessHours.${index}.close_time`,
                          ) === ''
                        }
                        className='w-[120px] text-center'
                      />
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
