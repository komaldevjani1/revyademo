"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  FileText,
  Download,
  Info,
  Clock,
  Filter,
  Eye,
  AlertCircle,
  Plug,
} from "lucide-react"
import { DeductionDrawer } from "./deduction-drawer"
import { AccountingModal } from "./accounting-modal"

// Sample data with realistic deduction scenarios
const chartData = [
  { month: "Jul", pending: 127400, recovered: 89200, gross: 216600 },
  { month: "Aug", pending: 134800, recovered: 95600, gross: 230400 },
  { month: "Sep", pending: 118200, recovered: 102300, gross: 220500 },
  { month: "Oct", pending: 142600, recovered: 87900, gross: 230500 },
  { month: "Nov", pending: 156300, recovered: 118700, gross: 275000 },
  { month: "Dec", pending: 164200, recovered: 134400, gross: 298600 },
]

const deductionsData = [
  {
    id: "DED-24-9847",
    amount: 4250.75,
    status: "Disputable",
    reasonCode: "SPLG",
    distributor: "UNFI",
    date: "2024-12-18",
    aging: 3,
    owner: "System Auto-Review",
    description: "Spoilage claim exceeds historical average by 340%",
    priority: "high",
  },
  {
    id: "DED-24-9846",
    amount: 1875.0,
    status: "Valid",
    reasonCode: "FRT",
    distributor: "KeHE",
    date: "2024-12-17",
    aging: 4,
    owner: "Finance Team",
    description: "Verified freight damage with carrier documentation",
    priority: "low",
  },
  {
    id: "DED-24-9845",
    amount: 8420.5,
    status: "Needs Review",
    reasonCode: "BB",
    distributor: "Target",
    date: "2024-12-16",
    aging: 5,
    owner: "Sarah Chen",
    description: "Promotional bill-back without matching agreement",
    priority: "high",
  },
  {
    id: "DED-24-9844",
    amount: 2340.25,
    status: "Disputable",
    reasonCode: "SHRT",
    distributor: "Sprouts",
    date: "2024-12-15",
    aging: 6,
    owner: "System Auto-Review",
    description: "Shortage claim conflicts with BOL quantities",
    priority: "medium",
  },
  {
    id: "DED-24-9843",
    amount: 5680.0,
    status: "Valid",
    reasonCode: "RTN",
    distributor: "UNFI",
    date: "2024-12-14",
    aging: 7,
    owner: "Finance Team",
    description: "Authorized return with proper documentation",
    priority: "low",
  },
  {
    id: "DED-24-9842",
    amount: 3125.75,
    status: "Needs Review",
    reasonCode: "DISC",
    distributor: "KeHE",
    date: "2024-12-13",
    aging: 8,
    owner: "Mike Rodriguez",
    description: "Discount applied without contract authorization",
    priority: "medium",
  },
]

const disputeActivity = [
  {
    id: "DED-24-9821",
    status: "recovered",
    amount: 6750,
    update: "Successfully recovered $6,750 from UNFI promotional overcharge",
    time: "23 min ago",
    distributor: "UNFI",
    type: "success",
  },
  {
    id: "DED-24-9819",
    status: "in-review",
    amount: 3200,
    update: "Documentation package sent to Target for bill-back verification",
    time: "2h ago",
    distributor: "Target",
    type: "pending",
  },
  {
    id: "DED-24-9817",
    status: "flagged",
    amount: 4850,
    update: "Sprouts shortage claim flagged - BOL shows full delivery",
    time: "4h ago",
    distributor: "Sprouts",
    type: "dispute",
  },
  {
    id: "DED-24-9815",
    status: "escalated",
    amount: 2100,
    update: "KeHE freight claim escalated to carrier insurance",
    time: "6h ago",
    distributor: "KeHE",
    type: "escalation",
  },
  {
    id: "DED-24-9813",
    status: "recovered",
    amount: 1950,
    update: "UNFI accepted dispute - credit memo issued",
    time: "1d ago",
    distributor: "UNFI",
    type: "success",
  },
]

const integrationStatus = [
  { name: "Gmail", status: "connected", lastSync: "30 sec ago", health: "excellent" },
  { name: "NetSuite Inbox", status: "connected", lastSync: "1 min ago", health: "excellent" },
  { name: "SAP ERP", status: "connected", lastSync: "2 min ago", health: "good" },
  { name: "Google Sheets", status: "connected", lastSync: "45 sec ago", health: "excellent" },
  { name: "PDF Parser", status: "connected", lastSync: "15 sec ago", health: "excellent" },
  { name: "Promo Calendar", status: "synced", lastSync: "5 min ago", health: "good" },
]

const topDeductionReasons = [
  { reason: "Promotional Bill-Back", volume: 34, amount: 89400, trend: "up" },
  { reason: "Spoilage Claims", volume: 28, amount: 67200, trend: "down" },
  { reason: "Freight Damage", volume: 19, amount: 45800, trend: "stable" },
]

const distributorInvalids = [
  { distributor: "Target", invalids: 12, amount: 34200, percentage: 23.4 },
  { distributor: "UNFI", invalids: 8, amount: 28900, percentage: 18.7 },
  { distributor: "Sprouts", invalids: 6, amount: 19500, percentage: 15.2 },
  { distributor: "KeHE", invalids: 4, amount: 12800, percentage: 11.8 },
]

export function RevyaDashboard() {
  const [selectedDeduction, setSelectedDeduction] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isAccountingModalOpen, setIsAccountingModalOpen] = useState(false)
  const [chartPeriod, setChartPeriod] = useState("6M")
  const [activityFilter, setActivityFilter] = useState("all")

  const handleExportChart = () => {
    alert("Exporting chart data...")
  }

  const handleFilterClick = () => {
    alert("Opening filter options...")
  }

  const handleExportTable = () => {
    alert("Exporting table data...")
  }

  const handleActivityReport = () => {
    alert("Generating activity report...")
  }

  const handleFlagForReview = (deductionId: string) => {
    alert(`Flagging ${deductionId} for review...`)
  }

  const handleExportCase = (deductionId: string) => {
    alert(`Exporting case ${deductionId}...`)
  }

  const handleDeductionClick = (deduction: any) => {
    setSelectedDeduction(deduction)
    setIsDrawerOpen(true)
  }

  const filteredActivity = disputeActivity.filter(
    (activity) => activityFilter === "all" || activity.distributor.toLowerCase() === activityFilter,
  )

  return (
    <TooltipProvider>
      <div className="flex flex-col w-full min-h-screen bg-gray-950">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center gap-3">
            <img src="/revya-logo-white.png" alt="Revya" className="h-10" />
            <div className="h-6 w-px bg-gray-700" />
            <h1 className="text-xl font-semibold text-gray-50">Revenue Recovery Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 space-y-8">
          {/* Top Metrics Overview */}
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Revenue Recovered"
                value="$1.3M"
                change="+24.8%"
                changeType="increase"
                description="Last 12 months"
                tooltip="Total amount successfully recovered from invalid deductions across all distributors in the past 12 months. Includes disputed amounts and preventative catches."
                icon={<DollarSign className="h-6 w-6 text-green-400" />}
                footnote="Includes fees"
              />
              <MetricCard
                title="Pending Deductions"
                value="$164.2K"
                change="+5.2%"
                changeType="increase"
                description="Current month"
                tooltip="Deductions currently under review, in dispute process, or awaiting documentation. Aging tracked from initial receipt date."
                icon={<FileText className="h-6 w-6 text-yellow-400" />}
                footnote="Open >7 days: 12"
              />
              <MetricCard
                title="Disputes in Progress"
                value="34"
                change="+6"
                changeType="increase"
                description="Active cases"
                tooltip="Number of deductions currently being disputed with distributors. Includes automated system disputes and manual escalations."
                icon={<AlertTriangle className="h-6 w-6 text-orange-400" />}
                footnote="Awaiting docs: 8"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {/* Insights & Forecasting */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  Insights & Forecasting
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700 max-w-xs">
                      <p className="text-sm">
                        AI-powered insights based on historical patterns and current pipeline analysis.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
                <CardDescription className="font-normal">AI-powered revenue insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-sm text-gray-400 uppercase tracking-wide">
                    Top Deduction Reasons
                  </h4>
                  <div className="space-y-4">
                    {topDeductionReasons.map((reason, index) => (
                      <div key={index} className="p-3 bg-gray-800/30 rounded-lg border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                reason.trend === "up"
                                  ? "bg-red-400"
                                  : reason.trend === "down"
                                    ? "bg-green-400"
                                    : "bg-yellow-400"
                              }`}
                            />
                            <span className="font-medium">{reason.reason}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">${(reason.amount / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-gray-400">{reason.volume} cases</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="font-semibold mb-4 text-sm text-gray-400 uppercase tracking-wide">
                    Distributor Invalids
                  </h4>
                  <div className="space-y-3">
                    {distributorInvalids.map((dist, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-800/20">
                        <span className="font-medium">{dist.distributor}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-red-400 font-semibold">{dist.invalids}</span>
                          <span className="text-gray-400 text-sm">({dist.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="font-semibold mb-4 text-sm text-gray-400 uppercase tracking-wide">
                    30-Day Projection
                  </h4>
                  <div className="bg-blue-900/10 border border-blue-800/20 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expected deductions:</span>
                      <span className="font-semibold text-yellow-400">$182K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Recoverable:</span>
                      <span className="font-semibold text-green-400">$47K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Confidence:</span>
                      <span className="font-semibold text-blue-400">87%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Deduction Management Table */}
            <Card className="lg:col-span-3 bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Deduction Management</CardTitle>
                    <CardDescription className="font-normal">Recent deductions requiring attention</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 bg-transparent font-medium"
                      onClick={handleFilterClick}
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 bg-transparent font-medium"
                      onClick={handleExportTable}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export Table
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                      <TableHead className="py-4 font-medium">Deduction ID</TableHead>
                      <TableHead className="py-4 font-medium">Amount</TableHead>
                      <TableHead className="py-4 font-medium">Status</TableHead>
                      <TableHead className="py-4 font-medium">Reason Code</TableHead>
                      <TableHead className="py-4 font-medium">Distributor</TableHead>
                      <TableHead className="py-4 font-medium text-center">Days Open</TableHead>
                      <TableHead className="py-4 font-medium">Owner</TableHead>
                      <TableHead className="py-4 font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deductionsData.map((deduction, index) => (
                      <TableRow
                        key={deduction.id}
                        className={`border-gray-800 hover:bg-gray-800/50 cursor-pointer ${
                          index !== deductionsData.length - 1 ? "border-b border-gray-800/50" : ""
                        }`}
                        onClick={() => handleDeductionClick(deduction)}
                      >
                        <TableCell className="font-mono text-sm py-6">{deduction.id}</TableCell>
                        <TableCell className="font-semibold py-6">${deduction.amount.toLocaleString()}</TableCell>
                        <TableCell className="py-6">
                          <StatusBadge status={deduction.status} />
                        </TableCell>
                        <TableCell className="py-6">
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {deduction.reasonCode}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 border-gray-700">
                              <p>{deduction.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="font-medium py-6">{deduction.distributor}</TableCell>
                        <TableCell className="py-6 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span
                              className={`text-sm font-medium ${
                                deduction.aging > 7
                                  ? "text-red-400"
                                  : deduction.aging > 3
                                    ? "text-yellow-400"
                                    : "text-green-400"
                              }`}
                            >
                              {deduction.aging}d
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-400 py-6">{deduction.owner}</TableCell>
                        <TableCell className="text-right py-6"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Data Ingestion Health */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  Data Ingestion Health
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700 max-w-xs">
                      <p className="text-sm">
                        Real-time monitoring of all data sources feeding the deduction recovery system.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
                <CardDescription className="font-normal">Live source monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationStatus.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusIndicator status={integration.status} health={integration.health} />
                      <span className="font-medium text-sm">{integration.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{integration.lastSync}</div>
                      <div
                        className={`text-xs font-medium ${
                          integration.health === "excellent"
                            ? "text-green-400"
                            : integration.health === "good"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {integration.status === "connected" ? "Live" : "Synced"}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-800">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 bg-transparent font-medium"
                    onClick={() => alert("Opening data source connection wizard...")}
                  >
                    <Plug className="h-4 w-4 mr-2" />
                    Add Integration
                  </Button>
                </div>
                <div className="pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">All systems operational</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Last full sync: 2 min ago</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Dispute Activity Feed */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 font-semibold">
                    Recent Dispute Activity
                    <Badge variant="outline" className="border-green-600 text-green-400 bg-green-400/10 font-medium">
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription className="font-normal">Real-time updates from active dispute cases</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={activityFilter} onValueChange={setActivityFilter}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Filter by..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Distributors</SelectItem>
                      <SelectItem value="unfi">UNFI</SelectItem>
                      <SelectItem value="target">Target</SelectItem>
                      <SelectItem value="sprouts">Sprouts</SelectItem>
                      <SelectItem value="kehe">KeHE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 bg-transparent font-medium"
                    onClick={handleActivityReport}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Activity Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivity.map((activity, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-800/50 border-l-4 ${
                      activity.type === "success"
                        ? "border-l-green-400 bg-green-400/5"
                        : activity.type === "pending"
                          ? "border-l-yellow-400 bg-yellow-400/5"
                          : activity.type === "dispute"
                            ? "border-l-red-400 bg-red-400/5"
                            : "border-l-orange-400 bg-orange-400/5"
                    } border border-gray-800/50`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                        {activity.type === "pending" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                        {activity.type === "dispute" && <XCircle className="h-5 w-5 text-red-400" />}
                        {activity.type === "escalation" && <AlertCircle className="h-5 w-5 text-orange-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium leading-tight mb-3">{activity.update}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-400">{activity.id}</span>
                          <span className="font-medium text-green-400">${activity.amount.toLocaleString()}</span>
                          <span className="text-gray-400">{activity.time}</span>
                          <Badge variant="outline" className="border-gray-600 text-xs">
                            {activity.distributor}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Modals and Drawers */}
        <DeductionDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} deduction={selectedDeduction} />
        <AccountingModal isOpen={isAccountingModalOpen} onClose={() => setIsAccountingModalOpen(false)} />
      </div>
    </TooltipProvider>
  )
}

function MetricCard({
  title,
  value,
  change,
  changeType,
  description,
  tooltip,
  icon,
  footnote,
}: {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  description: string
  tooltip: string
  icon: React.ReactNode
  footnote?: string
}) {
  const isIncrease = changeType === "increase"
  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3 w-3 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 border-gray-700 max-w-xs">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <span className={`flex items-center gap-1 font-semibold ${isIncrease ? "text-green-400" : "text-red-400"}`}>
              {isIncrease ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {change}
            </span>
            <span className="ml-2 text-gray-400 font-normal">{description}</span>
          </div>
        </div>
        {footnote && <div className="text-xs text-gray-500 mt-1 border-t border-gray-800 pt-1">{footnote}</div>}
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    Valid: {
      color: "text-green-400 bg-green-400/10 border-green-400/20",
      icon: CheckCircle2,
    },
    Disputable: {
      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      icon: AlertTriangle,
    },
    "Needs Review": {
      color: "text-red-400 bg-red-400/10 border-red-400/20",
      icon: XCircle,
    },
  }

  const config = variants[status as keyof typeof variants]
  const Icon = config.icon

  return (
    <Badge className={`${config.color} border font-medium`}>
      <Icon className="mr-1 h-3 w-3" />
      {status}
    </Badge>
  )
}

function StatusIndicator({ status, health }: { status: string; health: string }) {
  const getColor = () => {
    if (health === "excellent") return "bg-green-400"
    if (health === "good") return "bg-yellow-400"
    return "bg-red-400"
  }

  return <div className={`w-2 h-2 rounded-full ${getColor()} ${status === "connected" ? "animate-pulse" : ""}`} />
}

// Ensure both named and default exports are available
export default RevyaDashboard
