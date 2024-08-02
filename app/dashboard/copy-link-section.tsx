'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Props {
  storeId: number
  staffId: string
}

export const CopyLinkSection = ({ storeId, staffId }: Props) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN

  const urlCopyHandler = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('URLをコピーしました')
    } catch {
      toast.error('URLのコピーに失敗しました')
    }
  }

  return (
    <div className='w-full space-y-4 border p-4'>
      <p className='font-bold'>リンクをクリップボードにコピー</p>
      <div className='space-x-4'>
        <Button
          variant='outline'
          onClick={() =>
            urlCopyHandler(`${domain}/reservation/stores?store_id=${storeId}`)
          }
          className='h-8'
        >
          店舗ページ
        </Button>
        <Button
          variant='outline'
          onClick={() =>
            urlCopyHandler(
              `${domain}/reservation/menus?store_id=${storeId}&staff_id=${staffId}`,
            )
          }
          className='h-8'
        >
          スタッフページ
        </Button>
      </div>
    </div>
  )
}
