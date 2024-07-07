import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(req: NextRequest) {
  let res = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },

        setAll(newCookies) {
          newCookies.forEach((c) => req.cookies.set(c))

          res = NextResponse.next({ request: req })
          newCookies.forEach((c) => res.cookies.set(c))
        },
      },
    },
  )

  // ログインユーザーのみアクセス可能
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/login`)
    }

    // オーナーユーザーのみアクセス可能
    if (
      req.nextUrl.pathname.endsWith('/store') ||
      req.nextUrl.pathname.endsWith('/business-hours') ||
      req.nextUrl.pathname.endsWith('/staff')
    ) {
      if (user.user_metadata.role !== 'owner') {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,
        )
      }
    }
  }

  return res
}
