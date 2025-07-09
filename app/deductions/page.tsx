"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertTriangle, XCircle, Search, Filter } from "lucide-react"

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
    <div className="flex flex-col w-full">
      <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Deductions Management</h1>
      </header>

      <main className="flex-1 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search deductions..." className="pl-10 bg-gray-800 border-gray-700" />
          </div>
          <Button variant="outline" className="border-gray-600 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>All Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead>Deduction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allDeductions.map((deduction) => (
                  <TableRow key={deduction.id} className="border-gray-800 hover:bg-gray-800/50 cursor-pointer">
                    <TableCell className="font-medium">{deduction.id}</TableCell>
                    <TableCell>{deduction.customer}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
