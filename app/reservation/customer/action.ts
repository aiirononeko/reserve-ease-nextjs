'use server'

import { createClient } from '@/lib/supabase/server'
import type { z } from 'zod'
import { customerSchema } from './schema'

export const createCustomer = async (input: z.infer<typeof customerSchema>) => {
  const result = customerSchema.safeParse(input)
  if (!result.success) {
    throw new Error('入力情報が不正です')
  }

  const customer = await selectCustomer(input.email)
  if (customer) {
    return customer
  }

  return await insertCustomer(
    input.name,
    input.phone_number,
    input.email,
    input.store_id,
  )
}

const selectCustomer = async (email: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email)
    .single()
  if (error || !data) {
    return
  }

  return data
}

const insertCustomer = async (
  name: string,
  phoneNumber: string,
  email: string,
  storeId: number,
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('customers')
    .insert({
      name,
      phone_number: phoneNumber,
      email,
      store_id: storeId,
    })
    .select()
    .single()
  if (error) {
    throw error
  }

  return data
}
