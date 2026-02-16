"use client"

import type React from "react"
import { useState } from "react"
import { UploadCsvModal } from "@/components/upload-csv-modal"
import { useIntegrations } from "@/context/integration-context"
import { DeductionDetailModal } from "@/components/deduction-detail-modal"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  DollarSign,
  FileText,
  BarChart2,
} from "lucide-react"
import Image from "next/image"

const chartData = [
  { month: "Jan", recovered: 4000, pending: 2400 },
  { month: "Feb", recovered: 3000, pending: 1398 },
  { month: "Mar", recovered: 2000, pending: 9800 },
  { month: "Apr", recovered: 2780, pending: 3908 },
  { month: "May", recovered: 1890, pending: 4800 },
  { month: "Jun", recovered: 2390, pending: 3800 },
]

const deductionsData = [
  { id: "DED-001", amount: 250.0, status: "Disputable", date: "2024-06-20" },
  { id: "DED-002", amount: 150.0, status: "Valid", date: "2024-06-18" },
  { id: "DED-003", amount: 350.0, status: "Needs Review", date: "2024-06-15" },
  { id: "DED-004", amount: 450.0, status: "Valid", date: "2024-06-12" },
  { id: "DED-005", amount: 550.0, status: "Disputable", date: "2024-06-10" },
]

const disputes = [
  { id: "DIS-089", status: "Resolved", update: "Recovered $2,100", time: "2h ago" },
  { id: "DIS-088", status: "In Progress", update: "Email sent to distributor", time: "1d ago" },
  { id: "DIS-087", status: "New", update: "Deduction flagged for dispute", time: "3d ago" },
]

export function DashboardPage() {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false)
  const { isGoogleSheetsConnected } = useIntegrations()
  const [selectedDeduction, setSelectedDeduction] = useState<any>(null)
  const [isDeductionModalOpen, setDeductionModalOpen] = useState(false)

  const integrations = [
    { name: "Gmail", status: "success" },
    { name: "Google Sheets", status: isGoogleSheetsConnected ? "success" : "error" },
    { name: "SAP ERP", status: "warning" },
    { name: "PDF Documents", status: "success" },
  ]

  return (
    <div className="flex flex-col w-full">
      <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-xl font-semibold">Revenue Health Overview</h1>
        <div className="ml-auto flex items-center gap-4">
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-50">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 space-y-8">
        <div className="text-center">
          
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue Recovered"
            value="$1,284,593"
            change="+12.8%"
            changeType="increase"
            description="vs. last month"
            icon={<DollarSign className="h-6 w-6 text-green-400" />}
          />
          <StatCard
            title="Pending Deductions"
            value="$82,410"
            change="-3.2%"
            changeType="decrease"
            description="vs. last month"
            icon={<FileText className="h-6 w-6 text-yellow-400" />}
          />
          <StatCard
            title="Disputes In Progress"
            value="89"
            change="+5"
            changeType="increase"
            description="since last week"
            icon={<AlertTriangle className="h-6 w-6 text-orange-400" />}
          />
          <StatCard
            title="Revenue Leakage Prevented"
            value="97.3%"
            change="+1.5%"
            changeType="increase"
            description="Success Rate"
            icon={<BarChart2 className="h-6 w-6 text-blue-400" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Month-over-Month Trends</CardTitle>
              <CardDescription>Recovered Revenue vs. Pending Deductions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis stroke="#888888" tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip
                      cursor={{ fill: "rgba(136, 132, 216, 0.1)" }}
                      content={
                        <ChartTooltipContent
                          className="bg-gray-800 border-gray-700"
                          labelClassName="font-semibold"
                          indicator="dot"
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="recovered"
                      stroke="#34d399"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#34d399" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pending"
                      stroke="#facc15"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#facc15" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
              <CardDescription>Recent dispute activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {disputes.map((dispute, index) => (
                  <button
                    key={dispute.id}
                    className="flex items-start gap-4 w-full text-left p-2 rounded hover:bg-gray-800/30"
                    onClick={() => {
                      // Handle dispute click
                      console.log("Dispute clicked:", dispute.id)
                    }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {dispute.status === "Resolved" && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                      {dispute.status === "In Progress" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                      {dispute.status === "New" && <XCircle className="h-5 w-5 text-red-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{dispute.update}</p>
                      <p className="text-sm text-gray-400">
                        {dispute.id} - {dispute.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Deduction Management</CardTitle>
              <CardDescription>Deductions requiring your attention.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead>Deduction ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deductionsData.map((deduction) => (
                    <TableRow
                      key={deduction.id}
                      className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => {
                        setSelectedDeduction(deduction)
                        setDeductionModalOpen(true)
                      }}
                    >
                      <TableCell className="font-medium">{deduction.id}</TableCell>
                      <TableCell>${deduction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            deduction.status === "Valid"
                              ? "success"
                              : deduction.status === "Disputable"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {deduction.status === "Valid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {deduction.status === "Disputable" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {deduction.status === "Needs Review" && <XCircle className="mr-1 h-3 w-3" />}
                          {deduction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{deduction.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Data Ingestion Status</CardTitle>
              <CardDescription>Real-time integration health.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {integration.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                    {integration.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                    {integration.status === "error" && <XCircle className="h-5 w-5 text-red-400" />}
                    {integration.name}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      integration.status === "success"
                        ? "text-green-400"
                        : integration.status === "warning"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {integration.status === "success"
                      ? "Connected"
                      : integration.status === "warning"
                        ? "Sync Delayed"
                        : "Failed"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <UploadCsvModal isOpen={isUploadModalOpen} onOpenChange={setUploadModalOpen} />
      <DeductionDetailModal
        isOpen={isDeductionModalOpen}
        onOpenChange={setDeductionModalOpen}
        deduction={selectedDeduction}
      />
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  changeType,
  description,
  icon,
}: {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  description: string
  icon: React.ReactNode
}) {
  const isIncrease = changeType === "increase"
  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-gray-400">
          <span className={`flex items-center gap-1 font-semibold ${isIncrease ? "text-green-400" : "text-red-400"}`}>
            <ArrowUpRight className={`h-4 w-4 ${!isIncrease && "rotate-180"}`} />
            {change}
          </span>
          <span className="ml-2">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
