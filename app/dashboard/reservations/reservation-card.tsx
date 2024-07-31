'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Database } from '@/types/supabase'
import { addHour, date, format } from '@formkit/tempo'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ReservationDeleteDialog } from './reservation-delete-dialog'

interface Props {
  cardHeight: string
  reservation: Database['public']['Tables']['reservations']['Row']
  userId: string
}

export function ReservationCard({ cardHeight, reservation, userId }: Props) {
  const [open, setOpen] = useState(false)

  const startDatetime = date(reservation.start_datetime)
  const endDatetime = date(reservation.end_datetime)

  const isOwnReservation = reservation.user_id === userId

  const closeModal = () => {
    setOpen(false)
  }

  return <div className='h-20 w-full border-r'>reserve {reservation.id}</div>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-full'>
        <div className='relative h-20'>
          <div
            className={`absolute flex w-full flex-col justify-center space-y-1 px-2 text-xs font-semibold tracking-wide ${cardHeight} ${isOwnReservation ? 'border border-white bg-primary text-white' : 'border border-primary bg-white text-primary'}`}
          >
            <div className='space-x-1'>
              <span>{format(addHour(startDatetime, 9), 'HH:mm')}</span>
              <span>~</span>
              <span>{format(addHour(endDatetime, 9), 'HH:mm')}</span>
            </div>
            {/* @ts-expect-error because JOINした時の型定義あとでやる */}
            {reservation.customers.name && (
              // @ts-expect-error because JOINした時の型定義あとでやる
              <p>{reservation.customers.name} 様</p>
            )}
            {/* @ts-expect-error because JOINした時の型定義あとでやる */}
            <p>{reservation.menus.name}</p>
            {/* @ts-expect-error because JOINした時の型定義あとでやる */}
            <p>{reservation.users.name}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mt-2 space-y-10'>
          <DialogTitle>
            {/* @ts-expect-error because JOINした時の型定義あとでやる */}
            {reservation.customers.name
              ? // @ts-expect-error because JOINした時の型定義あとでやる
                reservation.customers.name
              : '顧客情報未入力'}{' '}
            様の予約
          </DialogTitle>
          <DialogDescription>
            <div className='grid w-full grid-cols-3 text-start'>
              <div className='col-span-1 space-y-4'>
                <p>予約開始時刻</p>
                <p>予約終了時刻</p>
                <p>所要時間(目安)</p>
                <p>メニュー</p>
                <p>担当スタッフ</p>
                <p>お客様電話番号</p>
                <p>お客様メールアドレス</p>
              </div>
              <div className='col-span-2 space-y-4 text-primary'>
                <p>{format(addHour(startDatetime, 9), 'YYYY/MM/DD HH:mm')}</p>
                <p>{format(addHour(endDatetime, 9), 'YYYY/MM/DD HH:mm')}</p>
                {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                <p>{reservation.menus.minutes} 分</p>
                {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                <p>{reservation.menus.name}</p>
                {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                <p>{reservation.users.name}</p>
                <a
                  // @ts-expect-error because JOINした時の型定義あとでやる */}
                  href={`tel:${reservation.customers.phone_number}`}
                  className='block underline'
                >
                  {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                  {reservation.customers.phone_number}
                </a>
                <a
                  // @ts-expect-error because JOINした時の型定義あとでやる
                  href={`mailto:${reservation.customers.email}`}
                  className='block underline'
                >
                  {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                  {reservation.customers.email}
                </a>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex flex-row justify-end'>
          <Button variant='ghost' asChild>
            <Link
              href={`/dashboard/reservations/edit?reservationId=${reservation.id}`}
            >
              <Pencil />
            </Link>
          </Button>
          <ReservationDeleteDialog
            reservation={reservation}
            closeModal={closeModal}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
