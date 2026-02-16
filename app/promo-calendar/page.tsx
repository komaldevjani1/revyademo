"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { IntegrationProvider } from "@/context/integration-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChevronLeft,
  ChevronRight,
  CalendarRange,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info,
  Filter,
  Download,
} from "lucide-react"

const promoEvents = [
  {
    id: "PRO-2025-001",
    name: "Q1 End Cap Display",
    retailer: "Walmart",
    type: "Display",
    startDate: "2025-02-03",
    endDate: "2025-02-16",
    budget: 45000,
    spent: 38200,
    deductionsExpected: 12500,
    deductionsActual: 14800,
    status: "Active",
    variance: 2300,
  },
  {
    id: "PRO-2025-002",
    name: "BOGO Week Promotion",
    retailer: "Target",
    type: "BOGO",
    startDate: "2025-02-10",
    endDate: "2025-02-17",
    budget: 28000,
    spent: 28000,
    deductionsExpected: 8400,
    deductionsActual: 8100,
    status: "Active",
    variance: -300,
  },
  {
    id: "PRO-2025-003",
    name: "Seasonal Price Reduction",
    retailer: "Kroger",
    type: "TPR",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    budget: 62000,
    spent: 34100,
    deductionsExpected: 18600,
    deductionsActual: 21400,
    status: "Active",
    variance: 2800,
  },
  {
    id: "PRO-2025-004",
    name: "New Product Launch Promo",
    retailer: "Costco",
    type: "Demo",
    startDate: "2025-02-17",
    endDate: "2025-03-02",
    budget: 35000,
    spent: 0,
    deductionsExpected: 10500,
    deductionsActual: 0,
    status: "Upcoming",
    variance: 0,
  },
  {
    id: "PRO-2025-005",
    name: "Winter Clearance",
    retailer: "UNFI",
    type: "Markdown",
    startDate: "2025-01-15",
    endDate: "2025-02-05",
    budget: 18000,
    spent: 18000,
    deductionsExpected: 5400,
    deductionsActual: 7200,
    status: "Completed",
    variance: 1800,
  },
  {
    id: "PRO-2025-006",
    name: "Shelf Talker Campaign",
    retailer: "Sprouts",
    type: "Display",
    startDate: "2025-02-24",
    endDate: "2025-03-09",
    budget: 15000,
    spent: 0,
    deductionsExpected: 4500,
    deductionsActual: 0,
    status: "Upcoming",
    variance: 0,
  },
  {
    id: "PRO-2025-007",
    name: "Valentine's Feature",
    retailer: "Target",
    type: "Feature",
    startDate: "2025-02-07",
    endDate: "2025-02-14",
    budget: 22000,
    spent: 22000,
    deductionsExpected: 6600,
    deductionsActual: 6400,
    status: "Completed",
    variance: -200,
  },
  {
    id: "PRO-2025-008",
    name: "Club Pack Promotion",
    retailer: "Costco",
    type: "Bundle",
    startDate: "2025-03-01",
    endDate: "2025-03-15",
    budget: 55000,
    spent: 0,
    deductionsExpected: 16500,
    deductionsActual: 0,
    status: "Planned",
    variance: 0,
  },
]

const calendarWeeks = [
  { weekStart: "Feb 3", weekEnd: "Feb 9" },
  { weekStart: "Feb 10", weekEnd: "Feb 16" },
  { weekStart: "Feb 17", weekEnd: "Feb 23" },
  { weekStart: "Feb 24", weekEnd: "Mar 2" },
]

function formatCurrency(value: number) {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  return `$${value.toLocaleString()}`
}

export default function PromoCalendarPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list")
  const [filterStatus, setFilterStatus] = useState("all")

  const totalBudget = promoEvents.reduce((sum, e) => sum + e.budget, 0)
  const totalSpent = promoEvents.reduce((sum, e) => sum + e.spent, 0)
  const totalExpectedDeductions = promoEvents.reduce((sum, e) => sum + e.deductionsExpected, 0)
  const totalActualDeductions = promoEvents.reduce((sum, e) => sum + e.deductionsActual, 0)
  const totalVariance = totalActualDeductions - totalExpectedDeductions

  const filteredEvents =
    filterStatus === "all" ? promoEvents : promoEvents.filter((e) => e.status.toLowerCase() === filterStatus)

  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Promo Calendar</h2>
                    <p className="text-gray-400">
                      Track promotional spend, expected deductions, and variance across retailers
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 bg-transparent text-gray-300"
                      onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
                    >
                      <CalendarRange className="h-4 w-4 mr-2" />
                      {viewMode === "list" ? "Calendar View" : "List View"}
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 bg-transparent text-gray-300">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Total Promo Budget</CardTitle>
                      <DollarSign className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{formatCurrency(totalBudget)}</div>
                      <p className="text-xs text-gray-400">8 promotions planned</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Committed Spend</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{formatCurrency(totalSpent)}</div>
                      <p className="text-xs text-green-500">
                        {((totalSpent / totalBudget) * 100).toFixed(0)}% of budget
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Expected Deductions</CardTitle>
                      <CalendarRange className="h-4 w-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{formatCurrency(totalExpectedDeductions)}</div>
                      <p className="text-xs text-gray-400">Based on promo agreements</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Actual Deductions</CardTitle>
                      <DollarSign className="h-4 w-4 text-orange-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{formatCurrency(totalActualDeductions)}</div>
                      <p className="text-xs text-gray-400">Deductions received to date</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Net Variance</CardTitle>
                      {totalVariance > 0 ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${totalVariance > 0 ? "text-red-400" : "text-green-400"}`}>
                        {totalVariance > 0 ? "+" : ""}
                        {formatCurrency(totalVariance)}
                      </div>
                      <p className="text-xs text-gray-400">
                        {totalVariance > 0 ? "Over expected deductions" : "Under expected deductions"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2">
                  {["all", "active", "upcoming", "completed", "planned"].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={filterStatus === status ? "default" : "outline"}
                      className={
                        filterStatus === status
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "border-gray-700 bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white"
                      }
                      onClick={() => setFilterStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>

                {/* Promo Events List */}
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="bg-gray-900 border-gray-800">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                              <Badge
                                className={
                                  event.status === "Active"
                                    ? "bg-green-600/20 text-green-400 border-green-600/30"
                                    : event.status === "Upcoming"
                                      ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                                      : event.status === "Completed"
                                        ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
                                        : "bg-purple-600/20 text-purple-400 border-purple-600/30"
                                }
                              >
                                {event.status}
                              </Badge>
                              <Badge variant="outline" className="border-gray-700 text-gray-400">
                                {event.type}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                              <span>
                                <span className="text-gray-500">Retailer:</span>{" "}
                                <span className="text-white">{event.retailer}</span>
                              </span>
                              <span>
                                <span className="text-gray-500">Period:</span>{" "}
                                <span className="text-white">
                                  {event.startDate} to {event.endDate}
                                </span>
                              </span>
                              <span className="font-mono text-gray-500">{event.id}</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Budget</p>
                                <p className="text-sm font-semibold text-white">{formatCurrency(event.budget)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Spent</p>
                                <p className="text-sm font-semibold text-white">{formatCurrency(event.spent)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Expected Deductions</p>
                                <p className="text-sm font-semibold text-yellow-400">
                                  {formatCurrency(event.deductionsExpected)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Actual Deductions</p>
                                <p className="text-sm font-semibold text-white">
                                  {event.deductionsActual > 0 ? formatCurrency(event.deductionsActual) : "--"}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Variance</p>
                                {event.variance !== 0 ? (
                                  <p
                                    className={`text-sm font-semibold ${event.variance > 0 ? "text-red-400" : "text-green-400"}`}
                                  >
                                    {event.variance > 0 ? "+" : ""}
                                    {formatCurrency(event.variance)}
                                  </p>
                                ) : (
                                  <p className="text-sm font-semibold text-gray-500">--</p>
                                )}
                              </div>
                            </div>

                            {/* Budget utilization bar */}
                            {event.spent > 0 && (
                              <div className="mt-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Budget utilization</span>
                                  <span>{((event.spent / event.budget) * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      event.spent / event.budget > 0.9 ? "bg-red-500" : "bg-purple-500"
                                    }`}
                                    style={{ width: `${Math.min((event.spent / event.budget) * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {event.variance > 1000 && (
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="ml-4 p-2 bg-red-900/20 border border-red-800/30 rounded-lg">
                                  <AlertTriangle className="h-5 w-5 text-red-400" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 border-gray-700 max-w-xs">
                                <p className="text-sm">
                                  Actual deductions exceed expected by {formatCurrency(event.variance)}. Review promo
                                  agreement terms with {event.retailer}.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          )}
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
