import type { Database } from '@/types/supabase'

interface Props {
  reservation: Database['public']['Tables']['reservations']['Row']
}

export function DuringCard({ reservation }: Props) {
  return <div className='h-20 w-full border-r'>during {reservation.id}</div>
}
