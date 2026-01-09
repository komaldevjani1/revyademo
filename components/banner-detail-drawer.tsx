"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface BannerDetailDrawerProps {
  banner: {
    banner: string
    plannedPercent: number
    actualPercent: number
    variance: number
    dollarImpact: number
    drivers: {
      edlp: { planned: number; actual: number; variance: number; dollarImpact: number }
      scan: { planned: number; actual: number; variance: number; dollarImpact: number }
      mcb: { planned: number; actual: number; variance: number; dollarImpact: number }
      slotting: { planned: number; actual: number; variance: number; dollarImpact: number }
      oi: { planned: number; actual: number; variance: number; dollarImpact: number }
      freightDelay: { planned: number; actual: number; variance: number; dollarImpact: number }
      shortage: { planned: number; actual: number; variance: number; dollarImpact: number }
      merchandising: { planned: number; actual: number; variance: number; dollarImpact: number }
    }
  } | null
  isOpen: boolean
  onClose: () => void
}

export function BannerDetailDrawer({ banner, isOpen, onClose }: BannerDetailDrawerProps) {
  if (!banner) return null

  const drivers = [
    { type: "EDLP", ...banner.drivers.edlp },
    { type: "Scan", ...banner.drivers.scan },
    { type: "MCB", ...banner.drivers.mcb },
    { type: "Slotting", ...banner.drivers.slotting },
    { type: "OI", ...banner.drivers.oi },
    { type: "Freight Delay", ...banner.drivers.freightDelay },
    { type: "Shortage", ...banner.drivers.shortage },
    { type: "Merchandising", ...banner.drivers.merchandising },
  ]

  // Sort drivers by largest negative impact
  const sortedDrivers = [...drivers].sort((a, b) => a.dollarImpact - b.dollarImpact)

  // Generate automatic insight
  const largestDriver = sortedDrivers[0]
  const secondDriver = sortedDrivers[1]

  const getDriverInsight = () => {
    const parts = []
    if (largestDriver.dollarImpact !== 0) {
      const sign = largestDriver.dollarImpact > 0 ? "+" : ""
      parts.push(
        `Largest driver: ${largestDriver.type} (${sign}$${Math.abs(largestDriver.dollarImpact / 1000).toFixed(0)}k)`,
      )
    }
    if (secondDriver && secondDriver.dollarImpact !== 0 && Math.abs(secondDriver.dollarImpact) > 5000) {
      const sign = secondDriver.dollarImpact > 0 ? "+" : ""
      parts.push(`followed by ${secondDriver.type} (${sign}$${Math.abs(secondDriver.dollarImpact / 1000).toFixed(0)}k)`)
    }
    return parts.join(", ") + "."
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0.5) return "text-red-400 bg-red-400/10"
    if (variance > 0) return "text-orange-400 bg-orange-400/10"
    if (variance < -0.5) return "text-green-400 bg-green-400/10"
    if (variance < 0) return "text-green-300 bg-green-300/10"
    return "text-gray-400 bg-gray-400/10"
  }

  const getDollarImpactColor = (impact: number) => {
    if (impact < -10000) return "text-red-400 font-semibold"
    if (impact < 0) return "text-orange-400 font-semibold"
    if (impact > 10000) return "text-green-400 font-semibold"
    if (impact > 0) return "text-green-300 font-semibold"
    return "text-gray-400"
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl bg-gray-900 border-gray-800 overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-gray-800">
          <SheetTitle className="text-2xl font-bold text-gray-50">{banner.banner}</SheetTitle>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Planned</div>
              <div className="text-lg font-semibold text-gray-300">{banner.plannedPercent.toFixed(1)}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Actual</div>
              <div className="text-lg font-semibold text-gray-50">{banner.actualPercent.toFixed(1)}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Variance</div>
              <div
                className={`text-lg font-semibold ${banner.variance > 0 ? "text-red-400" : banner.variance < 0 ? "text-green-400" : "text-gray-400"}`}
              >
                {banner.variance > 0 ? "+" : ""}
                {banner.variance.toFixed(1)} pts
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">$ Impact</div>
              <div className={getDollarImpactColor(banner.dollarImpact)}>
                {banner.dollarImpact > 0 ? "+" : ""}${Math.abs(banner.dollarImpact / 1000).toFixed(0)}K
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Automatic Insight */}
          <Card className="bg-blue-900/10 border-blue-800/30">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-200">{getDriverInsight()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Drivers Table */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Variance Drivers</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="py-3 font-medium">Type</TableHead>
                  <TableHead className="py-3 font-medium text-right">Planned</TableHead>
                  <TableHead className="py-3 font-medium text-right">Actual</TableHead>
                  <TableHead className="py-3 font-medium text-right">Variance</TableHead>
                  <TableHead className="py-3 font-medium text-right">$ Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDrivers.map((driver) => (
                  <TableRow key={driver.type} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell className="font-medium py-4 text-gray-50">{driver.type}</TableCell>
                    <TableCell className="text-right py-4 text-gray-300">{driver.planned.toFixed(1)}%</TableCell>
                    <TableCell className="text-right py-4 text-gray-50 font-medium">
                      {driver.actual.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getVarianceColor(driver.variance)}`}
                      >
                        {driver.variance > 0 ? "+" : ""}
                        {driver.variance.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right py-4 ${getDollarImpactColor(driver.dollarImpact)}`}>
                      {driver.dollarImpact > 0 ? "+" : ""}${Math.abs(driver.dollarImpact).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
