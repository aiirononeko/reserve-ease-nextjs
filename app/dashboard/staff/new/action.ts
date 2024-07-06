'use server'

import { createClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { inviteStaffSchema } from './schema'

export const inviteStaff = async (input: z.infer<typeof inviteStaffSchema>) => {
  const result = inviteStaffSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const user = await createAuthUser(input.email, Number(input.store_id))
  if (user)
    await createStaff(user.id, input.name, input.email, Number(input.store_id))

  revalidatePath('/dashboard/staff')
  redirect('/dashboard/staff')
}

const createAuthUser = async (email: string, storeId: number) => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      role: 'staff',
      store_id: storeId,
    },
  })
  if (error) {
    console.error(error.message)
    throw error
  }

  return user
}

const createStaff = async (
  userId: string,
  name: string,
  email: string,
  storeId: number,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('users')
    .insert({ id: userId, name, email, store_id: storeId })
  if (error) {
    console.error(error.message)
    throw error
  }
}
