import { createClient } from '@/lib/supabase/server'
import type { AuthUser } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const checkAuthAdmin = async (): Promise<AuthUser> => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/dashboard/login')

  // TODO: Adminのみがアクセスできるロジックを実装

  return user
}
