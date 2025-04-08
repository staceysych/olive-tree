import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BasketProvider } from '@/context/BasketContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Olive Tree - Farm Fresh Delivery',
  description: 'Get fresh farm goods delivered to your doorstep in Cyprus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BasketProvider>
          {children}
        </BasketProvider>
      </body>
    </html>
  )
}
