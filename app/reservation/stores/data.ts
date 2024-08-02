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
