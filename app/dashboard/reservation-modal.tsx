import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Database } from '@/types/supabase'
import type { AuthUser } from '@supabase/supabase-js'
import React from 'react'
import { ReservationCreateForm } from './reservation-create-form'
import { ReservationUpdateForm } from './reservation-update-form'

interface Props {
  isOpen: boolean
  onClose: () => void
  reservation:
    | {
        id: number
        date: string
        start_time: string
        end_time: string
      }
    | undefined
  user: AuthUser
  newReservationDatetime: Date | undefined
  menus: Database['public']['Tables']['menus']['Row'][]
}

export const ReservationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  reservation,
  user,
  newReservationDatetime,
  menus,
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
      ) : newReservationDatetime ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>予約作成</DialogTitle>
          </DialogHeader>
          <ReservationCreateForm
            initialDate={newReservationDatetime}
            user={user}
            menus={menus}
            onClose={onClose}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
