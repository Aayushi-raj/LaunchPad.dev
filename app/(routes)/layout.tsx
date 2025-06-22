import React from 'react'
import DashboardProvider from './provider'
import '@/app/globals.css'

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <DashboardProvider>{children}</DashboardProvider>
      </body>
    </html>
  )
}

export default DashboardLayout
