import type { AuthUser } from '@supabase/supabase-js'

export const checkUserRole = (user: AuthUser | null): string => {
  if (!user) return ''
  return user.user_metadata.role ?? ''
}

export const parseNumrange = (
  numrange: string | null,
): { openHour: number; closeHour: number } | undefined => {
  if (!numrange) return

  // 正規表現で数値部分を抽出
  const matches = numrange.match(/(\d+),(\d+)/)
  if (!matches || matches.length < 3) {
    throw new Error('Invalid numrange format')
  }

  // 数値部分を抽出して number 型に変換
  const openHour = parseInt(matches[1], 10)
  const closeHour = parseInt(matches[2], 10)
  return { openHour, closeHour }
}
