import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React from 'react'
import { ReservationUpdateForm } from './reservation-update-form'
import type { Reservation } from './type'

interface Props {
  isOpen: boolean
  onClose: () => void
  reservation: Reservation | null
}

export const ReservationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  reservation,
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
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>予約作成</DialogTitle>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  )
}
