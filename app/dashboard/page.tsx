"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { RevyaDashboard } from "@/components/revya-dashboard"
import { IntegrationProvider } from "@/context/integration-context"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function DashboardPage() {
  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <RevyaDashboard />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </IntegrationProvider>
    </TooltipProvider>
  )
}
