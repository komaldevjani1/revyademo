"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { IntegrationProvider } from "@/context/integration-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Share, Calendar, Filter } from "lucide-react"

const reports = [
  {
    title: "Monthly Recovery Report",
    description: "Comprehensive monthly analysis of recovered revenue and dispute outcomes",
    category: "Financial",
    frequency: "Monthly",
    lastGenerated: "2024-12-15",
    size: "2.4 MB",
    status: "Ready",
  },
  {
    title: "Distributor Performance Analysis",
    description: "Detailed breakdown of deduction patterns by distributor",
    category: "Analytics",
    frequency: "Weekly",
    lastGenerated: "2024-12-18",
    size: "1.8 MB",
    status: "Ready",
  },
  {
    title: "Deduction Aging Report",
    description: "Analysis of open deductions by age and priority",
    category: "Operational",
    frequency: "Daily",
    lastGenerated: "2024-12-19",
    size: "856 KB",
    status: "Ready",
  },
  {
    title: "ROI & Cost-Benefit Analysis",
    description: "Return on investment analysis for dispute resolution activities",
    category: "Financial",
    frequency: "Quarterly",
    lastGenerated: "2024-12-01",
    size: "3.2 MB",
    status: "Generating",
  },
  {
    title: "Trend Analysis & Forecasting",
    description: "Predictive analysis of deduction trends and revenue impact",
    category: "Analytics",
    frequency: "Monthly",
    lastGenerated: "2024-12-10",
    size: "2.1 MB",
    status: "Ready",
  },
  {
    title: "Compliance & Audit Trail",
    description: "Complete audit trail of all dispute activities and decisions",
    category: "Compliance",
    frequency: "Monthly",
    lastGenerated: "2024-12-16",
    size: "4.7 MB",
    status: "Ready",
  },
  {
    title: "Executive Summary Dashboard",
    description: "High-level KPIs and metrics for executive reporting",
    category: "Executive",
    frequency: "Weekly",
    lastGenerated: "2024-12-17",
    size: "1.2 MB",
    status: "Ready",
  },
  {
    title: "Customer Impact Analysis",
    description: "Analysis of deduction impact by customer segment",
    category: "Analytics",
    frequency: "Monthly",
    lastGenerated: "2024-12-12",
    size: "2.8 MB",
    status: "Ready",
  },
  {
    title: "Recovery Rate Benchmarking",
    description: "Comparison of recovery rates against industry benchmarks",
    category: "Financial",
    frequency: "Quarterly",
    lastGenerated: "2024-11-30",
    size: "1.9 MB",
    status: "Ready",
  },
  {
    title: "Workflow Efficiency Report",
    description: "Analysis of workflow performance and bottlenecks",
    category: "Operational",
    frequency: "Weekly",
    lastGenerated: "2024-12-18",
    size: "1.4 MB",
    status: "Ready",
  },
  {
    title: "Risk Assessment Matrix",
    description: "Risk analysis of outstanding deductions and disputes",
    category: "Executive",
    frequency: "Monthly",
    lastGenerated: "2024-12-14",
    size: "2.3 MB",
    status: "Ready",
  },
  {
    title: "Regulatory Compliance Report",
    description: "Compliance status with industry regulations and standards",
    category: "Compliance",
    frequency: "Quarterly",
    lastGenerated: "2024-12-01",
    size: "3.1 MB",
    status: "Ready",
  },
]

export default function ReportsPage() {
  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <div className="p-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
                  <p className="text-gray-400">Generate and download comprehensive reports</p>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      All Categories
                    </Button>
                    <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                      All Formats
                    </Button>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reports.map((report, index) => (
                    <Card key={index} className="bg-gray-900 border-gray-800">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg font-semibold text-white mb-2">{report.title}</CardTitle>
                            <Badge
                              variant={report.status === "Ready" ? "default" : "secondary"}
                              className={report.status === "Ready" ? "bg-green-600" : "bg-yellow-600"}
                            >
                              {report.status === "Generating" && "⚠ "}
                              {report.status === "Ready" && "✓ "}
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-gray-400 text-sm">{report.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-gray-400 mb-4">
                          <div className="flex justify-between">
                            <span>Category:</span>
                            <span className="text-white">{report.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frequency:</span>
                            <span className="text-white">{report.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Generated:</span>
                            <span className="text-white">{report.lastGenerated}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span className="text-white">{report.size}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            disabled={report.status !== "Ready"}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-gray-800 border-gray-700 text-gray-300"
                            disabled={report.status !== "Ready"}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-gray-800 border-gray-700 text-gray-300"
                            disabled={report.status !== "Ready"}
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </IntegrationProvider>
    </TooltipProvider>
  )
}
