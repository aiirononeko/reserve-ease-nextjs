import { createClient } from '@/lib/supabase/server'

export const getOwnerRole = async () => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .eq('name', 'owner')
    .single()
  if (error) {
    console.error(error.message)
  }

  return data
}
