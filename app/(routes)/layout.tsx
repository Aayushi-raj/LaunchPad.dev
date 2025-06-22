import React from 'react'
<<<<<<< HEAD
import DashboardProvider from './provider';
import "@/app/globals.css";


function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}

export default DashboardLayout
=======
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
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
