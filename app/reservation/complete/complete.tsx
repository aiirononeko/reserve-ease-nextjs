'use client'

import { useAtom } from 'jotai'
import { reservationAtom } from '../jotai'

export const Complete = () => {
  const [reservation] = useAtom(reservationAtom)

  return (
    <div>
      <p>ご予約いただきありがとうございます。</p>
      <br />
      <p>
        ご予約内容の詳細は、ご入力いただいたメールアドレス宛てに送信いたしましたのでご確認ください。
      </p>
      <p>
        ご不明な点やご予約内容の変更がある場合は下記連絡先までお問い合わせください。
      </p>
      <br />
      <p>連絡先</p>
      <p>・電話番号: {reservation.store.phone_number}</p>
    </div>
  )
}
