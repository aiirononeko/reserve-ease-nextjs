'use server'

import { createClient } from '@/lib/supabase/server'
import { decode } from 'base64-arraybuffer'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { storeSchema } from './schema'

export const updateStore = async (input: z.infer<typeof storeSchema>) => {
  const result = storeSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const supabase = createClient()

  const storagePath = await manageImage(input.icon_url, input.id)

  const { error } = await supabase
    .from('stores')
    .update({
      name: input.name,
      icon_url: storagePath,
      description: input.description,
      post_code: input.post_code,
      address: input.address,
      phone_number: input.phone_number,
      capacity: Number(input.capacity),
    })
    .eq('id', input.id)
  if (error) {
    throw error
  }

  revalidatePath('/dashboard/store')
}

const manageImage = async (image: string | undefined, storeId: number) => {
  const supabase = createClient()

  if (!image) {
    // ストレージから画像を削除
    const { error } = await supabase.storage
      .from('images')
      .remove([`store/${storeId}.jpeg`])
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
      .upload(`store/${storeId}.jpeg`, buffer, {
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
