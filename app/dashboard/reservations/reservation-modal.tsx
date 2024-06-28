import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React from 'react'
import type { Reservation } from './type'

interface Props {
  isOpen: boolean
  onClose: () => void
  reservation: Reservation | null
  onEdit: (reservation: Reservation) => void
  onDelete: (reservationId: number) => void
}

export const ReservationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  reservation,
  onEdit,
  onDelete,
}) => {
  if (!reservation) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>予約詳細</DialogTitle>
        </DialogHeader>
        {/* <div> */}
        {/*   <p>日付: {reservation.reservation_date}</p> */}
        {/*   <p> */}
        {/*     時間: {reservation.start_time} - {reservation.end_time} */}
        {/*   </p> */}
        {/*   <p>メニュー: {reservation.menus.name}</p> */}
        {/*   <p>予約者: {reservation.users.name}</p> */}
        {/* </div> */}
        <DialogFooter>
          <Button onClick={() => onEdit(reservation)}>編集</Button>
          <Button
            variant='destructive'
            onClick={() => onDelete(reservation.id)}
          >
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
