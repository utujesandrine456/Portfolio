import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'UWASE UTUJE Sandrine | CEO of AVENOR 10X Technologies',
  description: 'CEO of AVENOR 10X Technologies, Frontend Developer & Ethical Hacker building smarter systems for business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans bg-black text-[#DAC5A7] antialiased">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
