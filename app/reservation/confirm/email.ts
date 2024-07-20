'use server'

import { createClient } from '@/lib/resend'
import { format } from '@formkit/tempo'
import type { ExtractAtomValue } from 'jotai'
import type React from 'react'
import type { reservationAtom } from '../jotai'
import { ToCustomerEmailTemplate, ToStaffEmailTemplate } from './email-template'

export const sendEmailToCustomer = async (
  reservation: ExtractAtomValue<typeof reservationAtom>,
) => {
  const resend = createClient()

  if (!reservation.customer.email || !reservation.customer.name) {
    throw new Error('お客様の情報が不足しています')
  }

  if (!reservation.store.phone_number) {
    throw new Error('店舗の情報が不足しています')
  }

  if (!reservation.staff.name) {
    throw new Error('スタッフの情報が不足しています')
  }

  const reservationDatetime = format({
    date: reservation.startDatetime,
    format: 'YYYY/MM/DD HH:mm',
    locale: 'ja',
    tz: 'Asia/Tokyo',
  })

  const { error } = await resend.emails.send({
    from: 'ReserveEase <notifications@reserve-ease.com>',
    to: [reservation.customer.email],
    subject: 'ご予約いただきありがとうございます',
    react: ToCustomerEmailTemplate({
      customerName: reservation.customer.name,
      storePhoneNumber: reservation.store.phone_number,
      storeName: reservation.store.name,
      staffName: reservation.staff.name,
      menuName: reservation.menu.name,
      reservationDatetime,
      menuMinutes: reservation.menu.minutes,
      menuAmount: reservation.menu.amount.toLocaleString(),
    }) as React.ReactElement,
  })
  if (error) {
    throw error
  }
}

export const sendEmailToStaff = async (
  reservation: ExtractAtomValue<typeof reservationAtom>,
) => {
  const resend = createClient()

  if (
    !reservation.customer.email ||
    !reservation.customer.name ||
    !reservation.customer.phone_number
  ) {
    throw new Error('お客様の情報が不足しています')
  }

  if (!reservation.store.phone_number) {
    throw new Error('店舗の情報が不足しています')
  }

  if (!reservation.staff.email || !reservation.staff.name) {
    throw new Error('スタッフの情報が不足しています')
  }

  const reservationDatetime = format({
    date: reservation.startDatetime,
    format: 'YYYY/MM/DD HH:mm',
    locale: 'ja',
    tz: 'Asia/Tokyo',
  })

  const { error } = await resend.emails.send({
    from: 'ReserveEase <notifications@reserve-ease.com>',
    to: [reservation.staff.email],
    subject: '新しく予約が入りました',
    react: ToStaffEmailTemplate({
      staffName: reservation.staff.name,
      customerName: reservation.customer.name,
      customerPhoneNumber: reservation.customer.phone_number,
      customerEmail: reservation.customer.email,
      menuName: reservation.menu.name,
      reservationDatetime,
      menuMinutes: reservation.menu.minutes,
      menuAmount: reservation.menu.amount.toLocaleString(),
    }) as React.ReactElement,
  })
  if (error) {
    throw error
  }
}
