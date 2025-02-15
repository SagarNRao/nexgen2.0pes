// cognitium/src/app/layout.tsx
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/providers/SessionProvider'
import LayoutWrapper from '@/components/LayoutWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
