import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { AuthUser } from '@supabase/supabase-js'
import React from 'react'
import { ReservationCreateForm } from './reservation-create-form'
import { ReservationUpdateForm } from './reservation-update-form'

interface Props {
  isOpen: boolean
  onClose: () => void
  reservation: {
    id: number
    date: string
    start_time: string
    end_time: string
  } | null
  user: AuthUser
  newReservationDate: Date | null
  newReservationTime: string | null
}

export const ReservationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  reservation,
  user,
  newReservationDate,
  newReservationTime,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {reservation ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>予約詳細</DialogTitle>
          </DialogHeader>
          <ReservationUpdateForm reservation={reservation} onClose={onClose} />
        </DialogContent>
      ) : newReservationDate && newReservationTime ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>予約作成</DialogTitle>
          </DialogHeader>
          <ReservationCreateForm
            initialDate={newReservationDate}
            initialTime={newReservationTime}
            user={user}
            onClose={onClose}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
