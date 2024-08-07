'use client'

import { Button } from '@/components/ui/button'
import { date, format } from '@formkit/tempo'
import { useAtomValue } from 'jotai'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { reservationAtom } from '../jotai'
import { createReservation } from './action'
import { sendEmailToCustomer, sendEmailToStaff } from './email'

export const Confirmation = () => {
  const router = useRouter()
  const reservation = useAtomValue(reservationAtom)
  const [loading, setLoading] = useState(false)

  const reservationStartDatetime = format({
    date: date(reservation.startDatetime),
    format: 'YYYY/MM/DD HH:mm',
  })

  const handleClick = () => {
    const reserve = async () => {
      setLoading(true)
      try {
        // reservationsテーブルに予約データ作成
        await createReservation(reservation)
        // お客様にメール送信
        await sendEmailToCustomer(reservation)
        // スタッフにメール送信
        await sendEmailToStaff(reservation)

        router.push('/reservation/complete')

        setLoading(false)
      } catch (e) {
        toast.error(
          '予約の作成に失敗しました。もう一度最初からやり直してください。',
        )
      } finally {
        setLoading(false)
      }
    }

    reserve()
  }

  return (
    <div className='w-full space-y-8 p-4 text-sm shadow'>
      <div className='space-y-4'>
        <p className='text-lg font-bold'>予約内容</p>
        <div className='grid grid-cols-2 gap-4 px-4'>
          <p className='text-sm font-bold'>店舗名</p>
          <p>{reservation.store.name}</p>
          <p className='text-sm font-bold'>スタッフ</p>
          <p>{reservation.staff.name}</p>
          <p className='text-sm font-bold'>メニュー</p>
          <p>{reservation.menu.name}</p>
          <p className='text-sm font-bold'>来店日時</p>
          <p>{reservationStartDatetime}</p>
          <p className='text-sm font-bold'>所要時間(目安)</p>
          <p>{reservation.menu.minutes}分</p>
          <p className='text-sm font-bold'>合計金額</p>
          {reservation.menu.discount > 0 ? (
            <p>
              {(
                reservation.menu.amount - reservation.menu.discount
              )?.toLocaleString()}
              円(税込)
            </p>
          ) : (
            <p>{reservation.menu.amount?.toLocaleString()}円(税込)</p>
          )}
        </div>
      </div>
      <div className='space-y-4'>
        <p className='text-lg font-bold'>お客様情報</p>
        <div className='grid grid-cols-2 gap-4 px-4'>
          <p className='text-sm font-bold'>お名前</p>
          <p>{reservation.customer.name}</p>
          <p className='text-sm font-bold'>お電話番号</p>
          <p>{reservation.customer.phone_number}</p>
          <p className='text-sm font-bold'>メールアドレス</p>
          <p>{reservation.customer.email}</p>
        </div>
      </div>
      <Button onClick={handleClick} className='w-full'>
        {loading ? (
          <Loader2 className='mr-2 size-4 animate-spin' />
        ) : (
          <>予約を確定する</>
        )}
      </Button>
    </div>
  )
}
