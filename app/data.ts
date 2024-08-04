'use server'

import { createClient as createMicrocmsClient } from '@/lib/microcms'
import { createClient } from '@/lib/supabase/server'

export const getUser = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not found.')
  }

  return user
}

export const getStoreName = async (storeId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stores')
    .select('name')
    .eq('id', storeId)
    .single()
  if (error) {
    throw error
  }

  return data.name
}

export const getCases = async () => {
  const microcms = createMicrocmsClient()

  const { contents } = await microcms.getList({
    endpoint: 'cases',
    customRequestInit: {
      next: { tags: ['cases'] },
    },
  })
  return contents
}
