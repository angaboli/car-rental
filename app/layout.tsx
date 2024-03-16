import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
//import { ClerkProvider, SignIn, SignedIn } from '@clerk/nextjs'
//import { SignedOut } from '@clerk/nextjs'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IvoireWheels',
  description: 'Car rental developped by D3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-white">
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
