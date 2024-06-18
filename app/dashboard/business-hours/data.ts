import { createClient } from '@/lib/supabase/server'

export const getBusinessHours = async (storeId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('business_hours')
    .select('*')
    .eq('store_id', storeId)
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
