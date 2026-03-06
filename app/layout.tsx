import type { Metadata } from 'next'
import { Readex_Pro, Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from './context/ThemeContext'
import './globals.css'

const readex = Readex_Pro({ 
  subsets: ['latin', 'arabic'],
  variable: '--font-readex',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Naji Ali | Full Stack Developer',
  description: 'Specializing in high-performance eCommerce, B2B SaaS, and digital infrastructure for the MENA region.',
  keywords: ['Full Stack Developer', 'Saudi Startups', 'Next.js', 'Laravel', 'eCommerce Specialist'],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0c10', 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BTBC3QCCYK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BTBC3QCCYK');
          `}
        </Script>
      </head>
      <body className={`${readex.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none bg-[url('/noise.png')] bg-repeat" />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}