"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  FileText,
  BarChart2,
  Download,
  Send,
  Info,
} from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const chartData = [
  { month: "Jul", pending: 89400, recovered: 45200 },
  { month: "Aug", pending: 76300, recovered: 52800 },
  { month: "Sep", pending: 82100, recovered: 48900 },
  { month: "Oct", pending: 71200, recovered: 61300 },
  { month: "Nov", pending: 68900, recovered: 58700 },
  { month: "Dec", pending: 64200, recovered: 67400 },
]

const deductionsData = [
  {
    id: "DED-24-8901",
    amount: 2847.5,
    status: "Disputable",
    reasonCode: "SPLG",
    distributor: "UNFI",
    date: "2024-12-15",
    description: "Spoilage claim - expired product",
    documents: [
      { name: "Credit Memo", url: "/dummy-document.pdf" },
      { name: "Photos of Damaged Goods", url: "/dummy-document.pdf" },
    ],
  },
  {
    id: "DED-24-8902",
    amount: 1250.0,
    status: "Valid",
    reasonCode: "FRT",
    distributor: "KeHE",
    date: "2024-12-14",
    description: "Freight damage - verified",
    documents: [{ name: "BOL", url: "/dummy-document.pdf" }],
  },
  {
    id: "DED-24-8903",
    amount: 4200.75,
    status: "Needs Review",
    reasonCode: "BB",
    distributor: "Target",
    date: "2024-12-13",
    description: "Bill back - promotional allowance",
    documents: [
      { name: "Promotional Agreement", url: "/dummy-document.pdf" },
      { name: "Invoice", url: "/dummy-document.pdf" },
    ],
  },
  {
    id: "DED-24-8904",
    amount: 890.25,
    status: "Disputable",
    reasonCode: "SHRT",
    distributor: "Sprouts",
    date: "2024-12-12",
    description: "Shortage claim - count discrepancy",
    documents: [
      { name: "Receiving Log", url: "/dummy-document.pdf" },
      { name: "Inventory Report", url: "/dummy-document.pdf" },
    ],
  },
  {
    id: "DED-24-8905",
    amount: 3150.0,
    status: "Valid",
    reasonCode: "RTN",
    distributor: "UNFI",
    date: "2024-12-11",
    description: "Return authorization - damaged cases",
    documents: [{ name: "Return Authorization Form", url: "/dummy-document.pdf" }],
  },
]

const disputeActivity = [
  {
    id: "DED-24-8876",
    status: "recovered",
    amount: 3200,
    update: "Successfully recovered $3,200 from UNFI spoilage dispute",
    time: "2h ago",
    distributor: "UNFI",
  },
  {
    id: "DED-24-8834",
    status: "in-dispute",
    amount: 1850,
    update: "Documentation sent to KeHE for freight damage review",
    time: "6h ago",
    distributor: "KeHE",
  },
  {
    id: "DED-24-8812",
    status: "flagged",
    amount: 2400,
    update: "Invalid promotional deduction flagged for Target review",
    time: "1d ago",
    distributor: "Target",
  },
  {
    id: "DED-24-8798",
    status: "in-dispute",
    amount: 975,
    update: "Awaiting Sprouts response on shortage claim documentation",
    time: "2d ago",
    distributor: "Sprouts",
  },
]

const integrationStatus = [
  { name: "Gmail", status: "connected", lastSync: "2 min ago" },
  { name: "NetSuite", status: "connected", lastSync: "5 min ago" },
  { name: "Google Sheets", status: "connected", lastSync: "1 min ago" },
  { name: "SAP ERP", status: "synced", lastSync: "15 min ago" },
  { name: "PDF Parser", status: "connected", lastSync: "30 sec ago" },
]

export function RevenueDashboard() {
  const [selectedDeduction, setSelectedDeduction] = useState<any>(null)

  return (
    <TooltipProvider>
      <div className="flex flex-col w-full">
        <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
          <SidebarTrigger className="lg:hidden" />
          <h1 className="text-xl font-semibold">Revenue Health Overview</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 bg-transparent"
            >
              <Send className="h-4 w-4 mr-2" />
              Send to Accounting
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="User Avatar"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-50">
                <DropdownMenuLabel>CPG Finance Lead</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Audit Logs</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 space-y-8">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue Recovered"
              value="$1.28M"
              change="+18.2%"
              changeType="increase"
              description="Last 12 months"
              tooltip="Total amount recovered from invalid deductions across all distributors in the past 12 months"
              icon={<DollarSign className="h-6 w-6 text-green-400" />}
            />
            <MetricCard
              title="Pending Deductions"
              value="$64.2K"
              change="-6.8%"
              changeType="decrease"
              description="Current month"
              tooltip="Deductions currently under review or in dispute process"
              icon={<FileText className="h-6 w-6 text-yellow-400" />}
            />
            <MetricCard
              title="Disputes in Progress"
              value="14"
              change="+3"
              changeType="increase"
              description="Active cases"
              tooltip="Number of deductions currently being disputed with distributors"
              icon={<AlertTriangle className="h-6 w-6 text-orange-400" />}
            />
            <MetricCard
              title="Revenue Leakage Prevented"
              value="84.3%"
              change="+2.1%"
              changeType="increase"
              description="Success rate"
              tooltip="Percentage of invalid deductions successfully recovered or prevented"
              icon={<BarChart2 className="h-6 w-6 text-blue-400" />}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Month-over-Month Trends */}
            <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Month-over-Month Trends</CardTitle>
                    <CardDescription>Pending vs. Recovered Revenue (Last 6 Months)</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Chart
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    pending: {
                      label: "Pending Deductions",
                      color: "#facc15",
                    },
                    recovered: {
                      label: "Recovered Revenue",
                      color: "#34d399",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis dataKey="month" stroke="#888888" />
                      <YAxis stroke="#888888" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <ChartTooltipContent
                        className="bg-gray-800 border-gray-700"
                        labelClassName="font-semibold"
                        formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, ""]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#facc15"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#facc15" }}
                        name="Pending Deductions"
                      />
                      <Line
                        type="monotone"
                        dataKey="recovered"
                        stroke="#34d399"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#34d399" }}
                        name="Recovered Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Dispute Activity */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Dispute Activity</CardTitle>
                    <CardDescription>Live updates from active cases</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputeActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/30 cursor-pointer"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {activity.status === "recovered" && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                        {activity.status === "in-dispute" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                        {activity.status === "flagged" && <XCircle className="h-5 w-5 text-red-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">{activity.update}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{activity.id}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs font-medium text-green-400">
                            ${activity.amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <CardDescription>Recent deductions requiring attention</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Table
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                      <TableHead>Deduction ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason Code</TableHead>
                      <TableHead>Distributor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deductionsData.map((deduction) => (
                      <TableRow
                        key={deduction.id}
                        className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                        onClick={() => setSelectedDeduction(deduction)}
                      >
                        <TableCell className="font-mono text-sm">{deduction.id}</TableCell>
                        <TableCell className="font-semibold">${deduction.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={deduction.status} />
                        </TableCell>
                        <TableCell>
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
                        <TableCell className="font-medium">{deduction.distributor}</TableCell>
                        <TableCell className="text-gray-400">{deduction.date}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
                              <DialogHeader>
                                <DialogTitle>Deduction Details</DialogTitle>
                                <DialogDescription>
                                  View detailed information about deduction {deduction.id}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="deduction-id" className="text-right text-gray-400">
                                    Deduction ID
                                  </label>
                                  <input
                                    type="text"
                                    id="deduction-id"
                                    value={deduction.id}
                                    readOnly
                                    className="col-span-3 bg-gray-800 border-gray-700 rounded px-2 py-1 text-sm"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="amount" className="text-right text-gray-400">
                                    Amount
                                  </label>
                                  <input
                                    type="text"
                                    id="amount"
                                    value={`$${deduction.amount.toLocaleString()}`}
                                    readOnly
                                    className="col-span-3 bg-gray-800 border-gray-700 rounded px-2 py-1 text-sm"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="status" className="text-right text-gray-400">
                                    Status
                                  </label>
                                  <input
                                    type="text"
                                    id="status"
                                    value={deduction.status}
                                    readOnly
                                    className="col-span-3 bg-gray-800 border-gray-700 rounded px-2 py-1 text-sm"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="reason-code" className="text-right text-gray-400">
                                    Reason Code
                                  </label>
                                  <input
                                    type="text"
                                    id="reason-code"
                                    value={deduction.reasonCode}
                                    readOnly
                                    className="col-span-3 bg-gray-800 border-gray-700 rounded px-2 py-1 text-sm"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="distributor" className="text-right text-gray-400">
                                    Distributor
                                  </label>
                                  <input
                                    type="text"
                                    id="distributor"
                                    value={deduction.distributor}
                                    readOnly
                                    className="col-span-3 bg-gray-800 border-gray-700 rounded px-2 py-1 text-sm"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="date" className="text-right text-gray-400">
                                    Date
                                  </label>
                                  <input
                                    type="text"
                                    id="date"
                                    value={deduction.date}
                                    readOnly
                                    className="col-span-3 bg-gray-800 border-gray-700 rounded px-2 py-1 text-sm"
                                  />
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Description</h4>
                                  <p className="text-sm text-gray-500">{deduction.description}</p>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Download Documents</h4>
                                  <div className="flex flex-col gap-2">
                                    {deduction.documents &&
                                      deduction.documents.map((doc, index) => (
                                        <Button
                                          key={index}
                                          variant="outline"
                                          className="justify-start bg-transparent"
                                          onClick={() => window.open(doc.url, "_blank")}
                                        >
                                          <Download className="h-4 w-4 mr-2" />
                                          {doc.name}
                                        </Button>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Data Ingestion Status */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Data Ingestion Status</CardTitle>
                <CardDescription>Real-time source health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationStatus.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusIndicator status={integration.status} />
                      <span className="font-medium">{integration.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{integration.lastSync}</div>
                      <div className="text-xs font-medium text-green-400">
                        {integration.status === "connected" ? "Live" : "Synced"}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-800">
                  <div className="text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>All systems operational</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
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
}: {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  description: string
  tooltip: string
  icon: React.ReactNode
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
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="flex items-center text-xs">
          <span className={`flex items-center gap-1 font-semibold ${isIncrease ? "text-green-400" : "text-red-400"}`}>
            {isIncrease ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change}
          </span>
          <span className="ml-2 text-gray-400">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    Valid: {
      variant: "default" as const,
      color: "text-green-400 bg-green-400/10 border-green-400/20",
      icon: CheckCircle2,
    },
    Disputable: {
      variant: "secondary" as const,
      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      icon: AlertTriangle,
    },
    "Needs Review": {
      variant: "destructive" as const,
      color: "text-red-400 bg-red-400/10 border-red-400/20",
      icon: XCircle,
    },
  }

  const config = variants[status as keyof typeof variants]
  const Icon = config.icon

  return (
    <Badge className={`${config.color} border`}>
      <Icon className="mr-1 h-3 w-3" />
      {status}
    </Badge>
  )
}

function StatusIndicator({ status }: { status: string }) {
  const colors = {
    connected: "bg-green-400",
    synced: "bg-blue-400",
    warning: "bg-yellow-400",
    error: "bg-red-400",
  }

  return <div className={`w-2 h-2 rounded-full ${colors[status as keyof typeof colors] || colors.connected}`} />
}
