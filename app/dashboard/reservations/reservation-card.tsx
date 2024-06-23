import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { Database } from '@/types/supabase'
import { ReservationDeleteDialog } from './reservation-delete-dialog'
import { ReservationFormDialog } from './reservation-form-dialog'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
}

export const ReservationCard = ({ reservation }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{reservation.menu_id}</CardTitle>
        <CardDescription>{reservation.user_id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{reservation.reservation_date}</p>
      </CardContent>
      <CardFooter className='flex flex-row justify-end space-x-4'>
        <ReservationFormDialog reservation={reservation} />
        <ReservationDeleteDialog reservation={reservation} />
      </CardFooter>
    </Card>
  )
}
