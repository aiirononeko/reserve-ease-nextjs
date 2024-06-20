'use server'

import { createClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { storeSchema } from './schema'

export const createStore = async (input: z.infer<typeof storeSchema>) => {
  const result = storeSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .insert({ name: input.storeName })
    .select()
    .single()
  if (error) {
    console.error(error.message)
    return
  }

  const user = await inviteOwner(input.ownerEmail, data.id)
  if (user) await createOwnerUser(user.id, input.ownerEmail)

  redirect('/dashboard/admin/stores')
}

const inviteOwner = async (ownerEmail: string, storeId: number) => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(ownerEmail, {
    data: {
      role: 'owner',
      store_id: storeId,
    },
  })
  if (error) {
    console.error(error.message)
  }

  return user
}

const createOwnerUser = async (ownerUid: string, ownerEmail: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('users')
    .insert({ id: ownerUid, email: ownerEmail })
  if (error) {
    console.error(error.message)
  }
}
