'use server'

import { createClient } from '@/lib/supabase/server'
import { decode } from 'base64-arraybuffer'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { profileSchema } from './schema'

export const updateProfile = async (input: z.infer<typeof profileSchema>) => {
  const result = profileSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const supabase = createClient()

  const storagePath = await manageImage(input.icon_url, input.id)

  const { error } = await supabase
    .from('users')
    .update({
      name: input.name,
      icon_url: storagePath,
      profile: input.profile,
    })
    .eq('id', input.id)
  if (error) {
    throw error
  }

  revalidatePath('/dashboard/profile')
}

const manageImage = async (image: string | undefined, userId: string) => {
  const supabase = createClient()

  if (!image) {
    // ストレージから画像を削除
    const { error } = await supabase.storage
      .from('images')
      .remove([`users/${userId}.jpeg`])
    if (error) {
      throw error
    }
    return
  }

  if (image?.startsWith('data:')) {
    // 画像をアップロード
    const base64String = image.split(',')[1]
    const buffer = decode(base64String)
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`users/${userId}.jpeg`, buffer, {
        upsert: true,
        contentType: 'image/jpeg',
      })
    if (error) console.error(error)

    // アップロードした画像のURLを取得
    if (data) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(data.path)
      return publicUrl
    }
  }

  return image
}
