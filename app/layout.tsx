import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { Header } from '@/app/components/header'
import { Sidebar } from '@/app/components/sidebar'
import { cn } from '@/lib/utils'

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
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header />
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  )
}
