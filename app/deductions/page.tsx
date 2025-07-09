"use client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { IntegrationProvider } from "@/context/integration-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardPage } from "@/components/dashboard-page"

const allDeductions = [
  { id: "DED-001", amount: 250.0, status: "Disputable", date: "2024-06-20", customer: "ABC Distribution" },
  { id: "DED-002", amount: 150.0, status: "Valid", date: "2024-06-18", customer: "XYZ Retail" },
  { id: "DED-003", amount: 350.0, status: "Needs Review", date: "2024-06-15", customer: "Global Supply Co" },
  { id: "DED-004", amount: 450.0, status: "Valid", date: "2024-06-12", customer: "Metro Markets" },
  { id: "DED-005", amount: 550.0, status: "Disputable", date: "2024-06-10", customer: "Regional Foods" },
  { id: "DED-006", amount: 125.0, status: "Needs Review", date: "2024-06-08", customer: "Corner Store Chain" },
  { id: "DED-007", amount: 275.0, status: "Valid", date: "2024-06-05", customer: "Wholesale Direct" },
  { id: "DED-008", amount: 180.0, status: "Disputable", date: "2024-06-03", customer: "Quick Mart" },
]

export default function DeductionsPage() {
  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <DashboardPage />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </IntegrationProvider>
    </TooltipProvider>
  )
}
