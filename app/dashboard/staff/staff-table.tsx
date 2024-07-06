import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Database } from '@/types/supabase'
import { Trash2 } from 'lucide-react'

interface Props {
  allStaff: Database['public']['Tables']['users']['Row'][]
}

export const StaffTable = ({ allStaff }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[108px]'>スタッフ名</TableHead>
          <TableHead>メールアドレス</TableHead>
          <TableHead className='text-right' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {allStaff.map((staff) => (
          <TableRow key={staff.id}>
            <TableCell className='font-medium'>{staff.name}</TableCell>
            <TableCell>{staff.email}</TableCell>
            <TableCell className='text-right'>
              <Trash2 className='size-4' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
