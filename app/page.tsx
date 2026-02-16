"use client"

import { IntegrationProvider } from "@/context/integration-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { RevyaDashboard } from "@/components/revya-dashboard"

export default function Home() {
  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <main className="flex-1">
              <RevyaDashboard />
            </main>
          </div>
        </SidebarProvider>
      </IntegrationProvider>
    </TooltipProvider>
  )
}
