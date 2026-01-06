import type { Metadata } from "next"
import "@/index.css"

export const metadata: Metadata = {
  title: "Place Pulse - Find Businesses Without Websites",
  description: "Find businesses without websites in your area using Google Places API",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
