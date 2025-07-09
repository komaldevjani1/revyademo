"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

const sampleData = [
  {
    id: "TR-001",
    name: "Shortage Claim",
    amount: 120.5,
    status: "Invalid",
    reason: "Duplicate invoice number detected.",
  },
  { id: "TR-002", name: "Damaged Goods", amount: 85.0, status: "Valid", reason: "Approved damage claim." },
  {
    id: "TR-003",
    name: "Pricing Discrepancy",
    amount: 45.75,
    status: "Invalid",
    reason: "Contract price does not match invoice.",
  },
  { id: "TR-004", name: "Co-op Advertising", amount: 500.0, status: "Valid", reason: "Pre-approved marketing spend." },
  {
    id: "TR-005",
    name: "Late Delivery Penalty",
    amount: 210.0,
    status: "Invalid",
    reason: "Proof of delivery shows on-time arrival.",
  },
]

export function CsvDataTable() {
  return (
    <div className="rounded-lg border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-800/50">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id} className="border-gray-800 hover:bg-gray-800/50">
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>${row.amount.toFixed(2)}</TableCell>
              <TableCell>
                <StatusCell status={row.status} reason={row.reason} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusCell({ status, reason }: { status: "Valid" | "Invalid"; reason: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span onDoubleClick={() => setIsOpen(true)} className="cursor-pointer">
          <Badge variant={status === "Valid" ? "success" : "destructive"}>
            {status === "Valid" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <AlertTriangle className="mr-1 h-3 w-3" />
            )}
            {status}
          </Badge>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-gray-800 border-gray-700 text-gray-50">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Reason Hint</h4>
          <p className="text-sm text-gray-400">{reason}</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
