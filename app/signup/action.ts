'use server'

import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'
import type { z } from 'zod'
import { signUpSchema } from './schema'

export const signUp = async (input: z.infer<typeof signUpSchema>) => {
  const result = signUpSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const supabase = createClient()

  const store = await createStore(input.storeName)

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        role: 'owner',
        store_id: store.id,
      },
    },
  })
  if (error || !data.user) {
    throw new Error('ユーザーの登録に失敗しました')
  }

  await createStaff(data.user, input.name, input.email, store.id)
}

const createStore = async (storeName: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .insert({
      name: storeName,
    })
    .select()
    .single()
  if (error) {
    throw error
  }
  return data
}

const createStaff = async (
  user: AuthUser,
  name: string,
  email: string,
  storeId: number,
) => {
  const supabase = createClient()

  const { error } = await supabase.from('staffs').insert({
    id: user.id,
    email,
    name,
    store_id: storeId,
  })
  if (error) {
    throw error
  }
}
