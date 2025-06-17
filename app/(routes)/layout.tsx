import React from 'react'
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