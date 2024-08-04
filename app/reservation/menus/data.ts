'use server'

import { createClient } from '@/lib/supabase/server'

export const getStore = async (storeId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', storeId)
    .single()
  if (error) {
    throw error
  }

  return data
}

export const getMenus = async (staffId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('staff_id', staffId)
    .order('updated_at', { ascending: false })
  if (error) {
    throw error
  }

  return data
}

export const getStaff = async (staffId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('staffs')
    .select('*')
    .eq('id', staffId)
    .single()
  if (error) {
    throw error
  }

  return data
}
