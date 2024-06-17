'use server'

import { createClient } from '@/lib/supabase/server'

export const getStore = async () => {
  const supabase = createClient()

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
