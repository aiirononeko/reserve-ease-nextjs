import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const checkAuth = async () => {
  const user = await getUser()
  if (user) redirect('/dashboard/login')
}

export const getUser = async () => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error(error.message)
    throw error
  }

  return user
}
