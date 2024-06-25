import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'COCOGO',
  description: "L'Élégance sur quatre roues"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth focus:scroll-auto">
      <body className="bg-white">
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
