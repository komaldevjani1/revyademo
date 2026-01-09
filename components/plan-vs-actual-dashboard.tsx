"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown } from "lucide-react"
import { BannerDetailDrawer } from "./banner-detail-drawer"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Sample data for Plan vs Actual by Banner
const bannerData = [
  {
    banner: "Walmart",
    plannedPercent: 18.5,
    actualPercent: 21.2,
    variance: 2.7,
    dollarImpact: -125400,
    trend: "worsening", // worsening, improving, stable
    drivers: {
      edlp: { planned: 2.5, actual: 2.8, variance: 0.3, dollarImpact: -14200 },
      scan: { planned: 3.2, actual: 3.5, variance: 0.3, dollarImpact: -14200 },
      mcb: { planned: 2.8, actual: 3.0, variance: 0.2, dollarImpact: -9500 },
      slotting: { planned: 4.2, actual: 4.1, variance: -0.1, dollarImpact: 4200 },
      oi: { planned: 3.8, actual: 4.5, variance: 0.7, dollarImpact: -41000 },
      freightDelay: { planned: 0.8, actual: 1.5, variance: 0.7, dollarImpact: -24800 },
      shortage: { planned: 0.5, actual: 1.3, variance: 0.8, dollarImpact: -28400 },
      merchandising: { planned: 0.7, actual: 0.9, variance: 0.2, dollarImpact: -8900 },
    },
  },
  {
    banner: "Target",
    plannedPercent: 15.2,
    actualPercent: 16.8,
    variance: 1.6,
    dollarImpact: -68200,
    trend: "worsening",
    drivers: {
      edlp: { planned: 2.0, actual: 2.3, variance: 0.3, dollarImpact: -12800 },
      scan: { planned: 3.0, actual: 3.5, variance: 0.5, dollarImpact: -21300 },
      mcb: { planned: 2.2, actual: 2.3, variance: 0.1, dollarImpact: -4300 },
      slotting: { planned: 3.8, actual: 3.9, variance: 0.1, dollarImpact: -3800 },
      oi: { planned: 2.5, actual: 2.9, variance: 0.4, dollarImpact: -17000 },
      freightDelay: { planned: 0.6, actual: 0.8, variance: 0.2, dollarImpact: -8500 },
      shortage: { planned: 0.4, actual: 0.5, variance: 0.1, dollarImpact: -4300 },
      merchandising: { planned: 0.7, actual: 0.6, variance: -0.1, dollarImpact: 3800 },
    },
  },
  {
    banner: "Kroger",
    plannedPercent: 12.8,
    actualPercent: 11.5,
    variance: -1.3,
    dollarImpact: 52600,
    trend: "improving",
    drivers: {
      edlp: { planned: 1.8, actual: 1.5, variance: -0.3, dollarImpact: 12100 },
      scan: { planned: 2.5, actual: 2.2, variance: -0.3, dollarImpact: 12100 },
      mcb: { planned: 2.2, actual: 2.3, variance: 0.1, dollarImpact: -4000 },
      slotting: { planned: 3.2, actual: 2.8, variance: -0.4, dollarImpact: 16200 },
      oi: { planned: 2.1, actual: 1.9, variance: -0.2, dollarImpact: 8100 },
      freightDelay: { planned: 0.5, actual: 0.4, variance: -0.1, dollarImpact: 4000 },
      shortage: { planned: 0.3, actual: 0.2, variance: -0.1, dollarImpact: 4000 },
      merchandising: { planned: 0.2, actual: 0.2, variance: 0.0, dollarImpact: 0 },
    },
  },
  {
    banner: "Costco",
    plannedPercent: 9.5,
    actualPercent: 9.6,
    variance: 0.1,
    dollarImpact: -3800,
    trend: "stable",
    drivers: {
      edlp: { planned: 1.2, actual: 1.3, variance: 0.1, dollarImpact: -3800 },
      scan: { planned: 2.0, actual: 2.0, variance: 0.0, dollarImpact: 0 },
      mcb: { planned: 1.6, actual: 1.6, variance: 0.0, dollarImpact: 0 },
      slotting: { planned: 2.1, actual: 2.1, variance: 0.0, dollarImpact: 0 },
      oi: { planned: 1.8, actual: 1.8, variance: 0.0, dollarImpact: 0 },
      freightDelay: { planned: 0.4, actual: 0.4, variance: 0.0, dollarImpact: 0 },
      shortage: { planned: 0.2, actual: 0.2, variance: 0.0, dollarImpact: 0 },
      merchandising: { planned: 0.2, actual: 0.2, variance: 0.0, dollarImpact: 0 },
    },
  },
  {
    banner: "Albertsons",
    plannedPercent: 11.3,
    actualPercent: 13.8,
    variance: 2.5,
    dollarImpact: -89700,
    trend: "worsening",
    drivers: {
      edlp: { planned: 1.5, actual: 1.9, variance: 0.4, dollarImpact: -14400 },
      scan: { planned: 2.0, actual: 2.5, variance: 0.5, dollarImpact: -17900 },
      mcb: { planned: 2.0, actual: 2.1, variance: 0.1, dollarImpact: -3600 },
      slotting: { planned: 2.8, actual: 3.1, variance: 0.3, dollarImpact: -10800 },
      oi: { planned: 2.0, actual: 2.9, variance: 0.9, dollarImpact: -32300 },
      freightDelay: { planned: 0.5, actual: 0.6, variance: 0.1, dollarImpact: -3600 },
      shortage: { planned: 0.3, actual: 0.4, variance: 0.1, dollarImpact: -3600 },
      merchandising: { planned: 0.2, actual: 0.3, variance: 0.1, dollarImpact: -3500 },
    },
  },
  {
    banner: "Publix",
    plannedPercent: 8.7,
    actualPercent: 7.2,
    variance: -1.5,
    dollarImpact: 48900,
    trend: "improving",
    drivers: {
      edlp: { planned: 1.0, actual: 0.8, variance: -0.2, dollarImpact: 6500 },
      scan: { planned: 1.8, actual: 1.4, variance: -0.4, dollarImpact: 13000 },
      mcb: { planned: 1.4, actual: 1.3, variance: -0.1, dollarImpact: 3300 },
      slotting: { planned: 2.0, actual: 1.6, variance: -0.4, dollarImpact: 13000 },
      oi: { planned: 1.5, actual: 1.3, variance: -0.2, dollarImpact: 6500 },
      freightDelay: { planned: 0.5, actual: 0.4, variance: -0.1, dollarImpact: 3300 },
      shortage: { planned: 0.3, actual: 0.2, variance: -0.1, dollarImpact: 3300 },
      merchandising: { planned: 0.2, actual: 0.2, variance: 0.0, dollarImpact: 0 },
    },
  },
]

// Sort by largest negative impact first (default)
const sortedBannerData = [...bannerData].sort((a, b) => a.dollarImpact - b.dollarImpact)

export function PlanVsActualDashboard() {
  const [selectedBanner, setSelectedBanner] = useState<(typeof bannerData)[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31),
  })
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleRowClick = (banner: (typeof bannerData)[0]) => {
    setSelectedBanner(banner)
    setIsDrawerOpen(true)
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "worsening") {
      return <ArrowUp className="h-4 w-4 text-red-400" />
    } else if (trend === "improving") {
      return <ArrowDown className="h-4 w-4 text-green-400" />
    } else {
      return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 1.5) return "text-red-400 bg-red-400/10"
    if (variance > 0.5) return "text-yellow-400 bg-yellow-400/10"
    if (variance < -0.5) return "text-green-400 bg-green-400/10"
    return "text-gray-400 bg-gray-400/10"
  }

  const getDollarImpactColor = (impact: number) => {
    if (impact < -50000) return "text-red-400 font-semibold"
    if (impact < 0) return "text-orange-400 font-semibold"
    if (impact > 50000) return "text-green-400 font-semibold"
    if (impact > 0) return "text-green-300 font-semibold"
    return "text-gray-400"
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-gray-950">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center gap-3">
            <img src="/revya-logo-white.png" alt="Revya" className="h-10" />
            <div className="h-6 w-px bg-gray-700" />
            <h1 className="text-xl font-semibold text-gray-50">Plan vs Actual Dashboard</h1>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-400">Total Variance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">+4.1 pts</div>
                <p className="text-xs text-gray-400 mt-1">Across all banners</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-400">$ Impact YTD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">-$186K</div>
                <p className="text-xs text-gray-400 mt-1">Net margin erosion</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-400">Banners at Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">3 of 6</div>
                <p className="text-xs text-gray-400 mt-1">Variance &gt; 1.5 pts</p>
              </CardContent>
            </Card>
          </div>

          {/* Plan vs Actual Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Banner-Level Performance</CardTitle>
                  <CardDescription className="font-normal">
                    Click any row to see detailed driver breakdown
                  </CardDescription>
                </div>
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4 bg-gray-800 border-gray-700" align="end">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Quick Select</label>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              const now = new Date()
                              setDateRange({ from: new Date(now.getFullYear(), 0, 1), to: now })
                              setIsDatePickerOpen(false)
                            }}
                          >
                            Year to Date
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              const now = new Date()
                              setDateRange({ from: new Date(now.getFullYear(), now.getMonth(), 1), to: now })
                              setIsDatePickerOpen(false)
                            }}
                          >
                            This Month
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              const now = new Date()
                              const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                              const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
                              setDateRange({ from: lastMonth, to: lastMonthEnd })
                              setIsDatePickerOpen(false)
                            }}
                          >
                            Last Month
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              const now = new Date()
                              const quarter = Math.floor(now.getMonth() / 3)
                              setDateRange({
                                from: new Date(now.getFullYear(), quarter * 3, 1),
                                to: now,
                              })
                              setIsDatePickerOpen(false)
                            }}
                          >
                            This Quarter
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              setDateRange({
                                from: new Date(2024, 0, 1),
                                to: new Date(2024, 11, 31),
                              })
                              setIsDatePickerOpen(false)
                            }}
                          >
                            Full Year 2024
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="py-4 font-medium">Banner</TableHead>
                    <TableHead className="py-4 font-medium text-right">Planned %</TableHead>
                    <TableHead className="py-4 font-medium text-right">Actual %</TableHead>
                    <TableHead className="py-4 font-medium text-right">Variance (pts)</TableHead>
                    <TableHead className="py-4 font-medium text-right">$ Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBannerData.map((banner) => (
                    <TableRow
                      key={banner.banner}
                      className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => handleRowClick(banner)}
                    >
                      <TableCell className="font-semibold py-6">{banner.banner}</TableCell>
                      <TableCell className="text-right py-6 text-gray-300">
                        {banner.plannedPercent.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right py-6">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-gray-50 font-medium">{banner.actualPercent.toFixed(1)}%</span>
                          {getTrendIcon(banner.trend)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${getVarianceColor(banner.variance)}`}
                        >
                          {banner.variance > 0 ? "+" : ""}
                          {banner.variance.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right py-6 ${getDollarImpactColor(banner.dollarImpact)}`}>
                        {banner.dollarImpact > 0 ? "+" : ""}${Math.abs(banner.dollarImpact).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-50 font-medium">
                    Walmart showing largest variance at +2.7 pts ($125K impact)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Primarily driven by OI (+$41K) and Shortage (+$28K)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-900/20 border border-orange-800/30 rounded-lg">
                <TrendingDown className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-50 font-medium">Albertsons variance trending upward (+2.5 pts)</p>
                  <p className="text-xs text-gray-400 mt-1">OI and Scan costs exceeding plan significantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-50 font-medium">Kroger and Publix performing better than planned</p>
                  <p className="text-xs text-gray-400 mt-1">Combined positive impact of +$101.5K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Drill-down Drawer */}
      <BannerDetailDrawer banner={selectedBanner} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
