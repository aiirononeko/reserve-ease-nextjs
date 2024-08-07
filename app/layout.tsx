import '@/app/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter as FontSans } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { Footer } from './footer'
import { Header } from './header'
import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'mx-auto min-h-screen max-w-96 bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
      <GoogleTagManager gtmId='GTM-TBW47KX9' />
    </html>
  )
}
