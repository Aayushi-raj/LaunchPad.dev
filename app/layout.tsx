import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

// ✅ Corrected import without variable
const inter = Inter({ subsets: ["latin"],variable: '--font-inter' });

export const metadata: Metadata = {
  title: "LaunchPad.dev",
  description: "Plan. Match. Launch. Build your future with LaunchPad.dev",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider>
      <html lang="en">
        {/* ✅ Use inter.className, not inter.variable */}
        
        <body className={`${inter.className} antialiased`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>

    // <html lang="en">
    //   <body className={`${inter.variable} antialiased min-h-screen bg-background`}>
    //     <Provider>
    //       {children}
    //     </Provider>
    //   </body>
    // </html>

  );
}
