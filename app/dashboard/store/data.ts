'use server'

import { supabase } from '@/lib/supabase'

export const getStore = async () => {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) {
    console.error(error)
  }

  return data
}
