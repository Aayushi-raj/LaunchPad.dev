import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Provider from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LaunchPad.dev",
  description: "Plan. Match. Launch. Build your future with LaunchPad.dev",
  icons: {
    icon: '/favicon.ico', // Or .svg or .png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
=======
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen bg-background`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
  );
}
