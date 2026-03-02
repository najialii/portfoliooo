import type { Metadata } from 'next'
import { Readex_Pro, Inter } from 'next/font/google'
import './globals.css'

// Readex Pro is widely used in Saudi tech (like Salla & STC Pay) 
// because it handles Arabic and English perfectly.
const readex = Readex_Pro({ 
  subsets: ['latin', 'arabic'],
  variable: '--font-readex',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Naji Ali | Senior Full Stack Developer',
  description: 'Specializing in high-performance eCommerce, B2B SaaS, and digital infrastructure for the MENA region.',
  keywords: ['Full Stack Developer', 'Saudi Startups', 'Next.js', 'Laravel', 'eCommerce Specialist'],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0c10', // Deep black/slate for mobile browser status bar
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body className={`${readex.variable} ${inter.variable} font-sans bg-[#0a0c10] antialiased`}>
        {/* Subtle Background Grain for a "Premium" feel */}
        <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none bg-[url('/noise.png')] bg-repeat" />
        
        {children}
      </body>
    </html>
  )
}