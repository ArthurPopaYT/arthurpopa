import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Montserrat, Orbitron, VT323, Play } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-montserrat'
})
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron'
})
const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323'
})
const play = Play({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-play'
})

export const metadata: Metadata = {
  title: 'Arthur Popa - Digital Universe',
  description: 'Welcome to my digital universe - A futuristic, immersive portfolio experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={`${inter.className} ${montserrat.variable} ${orbitron.variable} ${vt323.variable} ${play.variable}`}>
        {children}
      </body>
    </html>
  )
} 