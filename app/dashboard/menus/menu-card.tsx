import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { Database } from '@/types/supabase'

import { MenuDeleteDialog } from './menu-delete-dialog'
import { MenuFormDialog } from './menu-form-dialog'

interface Props {
  menu: Database['public']['Tables']['menus']['Row']
}

export const MenuCard = ({ menu }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{menu.name}</CardTitle>
        <CardDescription>{menu.amount}円</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{menu.description}</p>
      </CardContent>
      <CardFooter className='flex flex-row justify-end space-x-4'>
        <MenuFormDialog menu={menu} />
        <MenuDeleteDialog menu={menu} />
      </CardFooter>
    </Card>
  )
}
