'use server'

import { createClient } from '@/lib/supabase/server'
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

  await inviteOwner(input.ownerEmail, data.id)
}

const inviteOwner = async (ownerEmail: string, storeId: number) => {
  const supabase = createClient()

  const { error } = await supabase.auth.admin.inviteUserByEmail(ownerEmail, {
    data: {
      role: 'owner',
      store_id: storeId,
    },
    redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/setting-password`,
  })
  if (error) {
    console.error(error.message)
    return
  }
}
