import type { AuthUser } from '@supabase/supabase-js'

export const checkUserRole = (user: AuthUser | null): string => {
  if (!user) return ''
  return user.user_metadata.role ?? ''
}
