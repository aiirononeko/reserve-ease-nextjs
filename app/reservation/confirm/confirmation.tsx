'use client'

import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { reservationAtom } from '../jotai'

export const Confirmation = () => {
  const [reservation] = useAtom(reservationAtom)

  return (
    <div>
      <p>予約内容</p>
      <div className='grid grid-cols-2'>
        <p>サロン名</p>
        <p>{reservation.store.name}</p>
        <p>スタッフ</p>
        <p>{reservation.staff.name}</p>
        <p>メニュー</p>
        <p>{reservation.menu.name}</p>
        <p>来店日時</p>
        <p>{reservation.date}</p>
        <p>所要時間(目安)</p>
        <p>後で作る</p>
        <p>合計金額</p>
        {reservation.menu.discount > 0 ? (
          <p>
            {(
              reservation.menu.amount - reservation.menu.discount
            ).toLocaleString()}
            円(税込)
          </p>
        ) : (
          <p>{reservation.menu.amount.toLocaleString()}円(税込)</p>
        )}
      </div>
      <p>予約内容</p>
      <div className='grid grid-cols-2'>
        <p>お客様のお名前</p>
        <p>{reservation.customer.name}</p>
        <p>お客様のお電話番号</p>
        <p>{reservation.customer.phone_number}</p>
        <p>お客様のメールアドレス</p>
        <p>{reservation.customer.email}</p>
      </div>
      <Button asChild className='w-full'>
        <Link href='/reservation/complete'>予約を確定する</Link>
      </Button>
    </div>
  )
}
