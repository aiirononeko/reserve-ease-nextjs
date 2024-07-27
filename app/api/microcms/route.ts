import crypto from 'crypto'
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

type RequestBody = {
  id: string | null | undefined
  api: string
}

export async function POST(request: NextRequest) {
  const bodyText = await request.text()
  const bodyBuffer = Buffer.from(bodyText, 'utf-8')

  if (!bodyText) {
    console.error('Body is empty.')
    return NextResponse.json({
      status: 400,
    })
  }

  const { id, api: endpoint } = JSON.parse(bodyText) as RequestBody

  const secret = process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET
  if (!secret) {
    console.error('Secret is empty.')
    return NextResponse.json({
      status: 500,
    })
  }

  const signature = request.headers.get('X-MICROCMS-Signature')
  if (!signature) {
    console.error('Signature is empty.')
    return NextResponse.json({
      status: 400,
    })
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(bodyBuffer)
    .digest('hex')

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  )

  if (!isValid) {
    console.error('Invalid signature.')
    return NextResponse.json({
      status: 400,
    })
  }

  if (id) {
    revalidateTag(`${endpoint}/${id}`)
  }

  revalidateTag(endpoint)

  return NextResponse.json({ message: 'success' })
}
