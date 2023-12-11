import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Global/Header/Header'
import SessionProvider from './SessionProvider'
const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tracking tool',
  description: 'Devot Tracking tool for tracking time spend on projects and everthing else you need.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header />
        <main>
          <SessionProvider>
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  )
}
