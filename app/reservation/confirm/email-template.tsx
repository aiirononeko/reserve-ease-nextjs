import React from 'react'

interface ToCustomerEmailTemplateProps {
  customerName: string
  storePhoneNumber: string
  storeName: string
  staffName: string
  menuName: string
  reservationDatetime: string
  menuMinutes: number
  menuAmount: string
}

interface ToStaffEmailTemplateProps {
  staffName: string
  customerName: string
  customerPhoneNumber: string
  customerEmail: string
  menuName: string
  reservationDatetime: string
  menuMinutes: number
  menuAmount: string
}

export const ToCustomerEmailTemplate: React.FC<
  Readonly<ToCustomerEmailTemplateProps>
> = ({
  customerName,
  storePhoneNumber,
  storeName,
  staffName,
  menuName,
  reservationDatetime,
  menuMinutes,
  menuAmount,
}) => (
  <div>
    <p>{customerName}様のご予約を承りました。</p>
    <p>
      予約内容をご確認いただき、ご不明な点やご予約内容の変更がある場合は下記連絡先までお問い合わせください。
    </p>
    <div>
      <p>店舗名: {storeName}</p>
      <p>スタッフ: {staffName}</p>
      <p>メニュー: {menuName}</p>
      <p>来店日時: {reservationDatetime}</p>
      <p>所要時間(目安): {menuMinutes}分</p>
      <p>合計金額: {menuAmount}円(税込)</p>
    </div>
    <p>当日はお気をつけてお越しくださいませ。</p>
    <p>連絡先</p>
    <p>・電話番号: {storePhoneNumber}</p>
    <br />
  </div>
)

export const ToStaffEmailTemplate: React.FC<
  Readonly<ToStaffEmailTemplateProps>
> = ({
  staffName,
  customerName,
  customerPhoneNumber,
  customerEmail,
  menuName,
  reservationDatetime,
  menuMinutes,
  menuAmount,
}) => (
  <div>
    <p>{staffName}様に新しく予約が入りましたのでお知らせいたします。</p>
    <div>
      <p>お客様氏名: {customerName}</p>
      <p>お客様電話番号: {customerPhoneNumber}</p>
      <p>お客様メールアドレス: {customerEmail}</p>
      <p>メニュー: {menuName}</p>
      <p>来店日時: {reservationDatetime}</p>
      <p>所要時間(目安): {menuMinutes}分</p>
      <p>合計金額: {menuAmount}円(税込)</p>
    </div>
    <p>ReserveEaseのダッシュボードからも予約内容をご確認いただけます。</p>
    <a href='https://reserve-ease.com/dashboard'>ダッシュボードへアクセス</a>
    <p>引き続きよろしくお願いいたします。</p>
    <br />
  </div>
)
