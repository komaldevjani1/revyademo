import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { IntegrationProvider } from "@/context/integration-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Revenue Operations Dashboard",
  description: "Modern SaaS dashboard for revenue operations.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <IntegrationProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
                <AppSidebar />
                <main className="flex-1">{children}</main>
              </div>
            </SidebarProvider>
          </IntegrationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
