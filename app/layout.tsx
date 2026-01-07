import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturation Pro - Auto-Entrepreneur',
  description: 'Application de facturation complète pour auto-entrepreneurs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
