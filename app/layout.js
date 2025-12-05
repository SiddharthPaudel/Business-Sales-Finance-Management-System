import { Html } from "next/document"

export const metadata={
  title:"Next.js Demo",
  description:"A simple demo project",
}

import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "700"],
     // optional but useful
});

export default function RootLayout({children}){
  return(
    <html lang="en"  className={inter.variable}>
      <body>{children}</body>

    </html>
  )
}