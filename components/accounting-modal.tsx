"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Send, Paperclip } from "lucide-react"

interface AccountingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountingModal({ isOpen, onClose }: AccountingModalProps) {
  const [selectedFormat, setSelectedFormat] = useState("csv")
  const [emailRecipients, setEmailRecipients] = useState("accounting@yourcompany.com")
  const [includeAttachments, setIncludeAttachments] = useState(true)
  const [dateRange, setDateRange] = useState("current-month")

  const summaryData = {
    totalRecovered: 134400,
    pendingAmount: 164200,
    validDeductions: 12680,
    disputedAmount: 89750,
    transactionCount: 47,
  }

  const handleSendToAccounting = () => {
    // Simulate sending to accounting
    console.log("Sending to accounting with format:", selectedFormat)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-800 text-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send to Accounting
          </DialogTitle>
          <DialogDescription>Export deduction data and recovery reports for accounting integration</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="email">Email Report</TabsTrigger>
            <TabsTrigger value="export">Direct Export</TabsTrigger>
            <TabsTrigger value="integration">QuickBooks Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipients">Email Recipients</Label>
                  <Input
                    id="recipients"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    placeholder="accounting@yourcompany.com"
                  />
                </div>

                <div>
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="quarter">Current Quarter</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                      <SelectItem value="xlsx">Excel Workbook</SelectItem>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="attachments" checked={includeAttachments} onCheckedChange={setIncludeAttachments} />
                  <Label htmlFor="attachments">Include supporting documents</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Summary Preview</h4>
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Recovered:</span>
                    <span className="font-semibold text-green-400">${summaryData.totalRecovered.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Pending Amount:</span>
                    <span className="font-semibold text-yellow-400">${summaryData.pendingAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Valid Deductions:</span>
                    <span className="font-semibold text-blue-400">${summaryData.validDeductions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Disputed Amount:</span>
                    <span className="font-semibold text-purple-400">
                      ${summaryData.disputedAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Transactions:</span>
                      <span className="font-semibold">{summaryData.transactionCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="message">Email Message</Label>
              <Textarea
                id="message"
                className="bg-gray-800 border-gray-700 min-h-[100px]"
                placeholder="Monthly deduction recovery report attached. Please review and process the recovered amounts for P&L adjustment."
                defaultValue="Monthly deduction recovery report attached. Please review and process the recovered amounts for P&L adjustment."
              />
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Export Options</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Full Deduction Report (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Recovery Summary (Excel)
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Audit Trail (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Journal Entries (CSV)
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">File Contents</h4>
                <div className="bg-gray-800/50 p-4 rounded-lg text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span>Deduction details with GL codes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-400" />
                    <span>Recovery amounts by distributor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-yellow-400" />
                    <span>Dispute status and aging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                    <span>Supporting documentation links</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6 mt-6">
            <div className="text-center py-8">
              <div className="bg-blue-900/20 border border-blue-800/30 p-6 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">QuickBooks Integration</h4>
                <p className="text-sm text-blue-300 mb-4">
                  Direct sync with QuickBooks Online for automated journal entries and credit memos.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Connect QuickBooks
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-600 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSendToAccounting} className="bg-purple-600 hover:bg-purple-700">
            <Send className="h-4 w-4 mr-2" />
            Send to Accounting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
