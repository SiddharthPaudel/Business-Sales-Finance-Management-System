import { Html } from "next/document"

export const metadata={
  title:"Next.js Demo",
  description:"A simple demo project",
}

export default function RootLayout({children}){
  return(
    <html lang="en">
      <body>{children}</body>

    </html>
  )
}