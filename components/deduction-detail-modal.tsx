"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertTriangle, XCircle, FileText, Mail, Download, Eye, Flag, Upload } from "lucide-react"

interface DeductionDetailModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  deduction: any
}

export function DeductionDetailModal({ isOpen, onOpenChange, deduction }: DeductionDetailModalProps) {
  if (!deduction) return null

  // Sample data based on deduction status
  const getDeductionDetails = () => {
    if (deduction.status === "Needs Review") {
      return {
        customer: "Target Corporation",
        invoice: "INV-2024-8903",
        reason:
          "Bill back promotional allowance claimed without valid authorization. No matching promotional agreement found in our records.",
        documents: [
          { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
          { name: "Promotional Agreement", type: "PDF", status: "missing", color: "red" },
          { name: "Deduction Notice", type: "PDF", status: "available", color: "yellow" },
        ],
        communications: [
          {
            type: "received",
            subject: "Promotional Deduction Claim",
            time: "3 days ago",
            content:
              "Target is claiming $4,200.75 promotional allowance for Q4 campaign. Requesting documentation to verify authorization.",
          },
        ],
        nextSteps: "Request promotional agreement documentation from Target to verify claim validity.",
      }
    } else if (deduction.status === "Disputable") {
      return {
        customer: "UNFI",
        invoice: "INV-2024-8901",
        reason:
          "Spoilage claim appears inflated. Customer reported 50 cases spoiled, but delivery receipt shows only 45 cases total delivered.",
        documents: [
          { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
          { name: "Delivery Receipt", type: "PDF", status: "available", color: "green" },
          { name: "Spoilage Report", type: "PDF", status: "available", color: "yellow" },
          { name: "Photo Evidence", type: "JPG", status: "available", color: "green" },
        ],
        communications: [
          {
            type: "received",
            subject: "Spoilage Claim - 50 Cases",
            time: "2 days ago",
            content: "UNFI reporting spoilage of 50 cases due to temperature control failure during transport.",
          },
          {
            type: "sent",
            subject: "RE: Spoilage Claim - Documentation Request",
            time: "1 day ago",
            content: "Requesting delivery receipt verification. Our records show only 45 cases delivered total.",
          },
        ],
        nextSteps: "Dispute with delivery receipt evidence showing case count discrepancy.",
      }
    } else {
      return {
        customer: "KeHE Distributors",
        invoice: "INV-2024-8902",
        reason: "Verified freight damage claim with proper documentation and photo evidence.",
        documents: [
          { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
          { name: "Damage Report", type: "PDF", status: "available", color: "green" },
          { name: "Carrier Receipt", type: "PDF", status: "available", color: "green" },
          { name: "Damage Photos", type: "JPG", status: "available", color: "green" },
        ],
        communications: [
          {
            type: "received",
            subject: "Freight Damage Claim",
            time: "5 days ago",
            content:
              "KeHE reporting freight damage to 12 cases during shipment. Damage photos and carrier report attached.",
          },
          {
            type: "sent",
            subject: "RE: Freight Damage Claim - Approved",
            time: "4 days ago",
            content: "Claim approved based on carrier damage report and photographic evidence. Processing credit.",
          },
        ],
        nextSteps: "Claim approved and processed.",
      }
    }
  }

  const details = getDeductionDetails()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-gray-900 border-gray-800 text-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Deduction Details - {deduction.id}
            <Badge
              variant={
                deduction.status === "Valid" ? "success" : deduction.status === "Disputable" ? "warning" : "destructive"
              }
            >
              {deduction.status === "Valid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
              {deduction.status === "Disputable" && <AlertTriangle className="mr-1 h-3 w-3" />}
              {deduction.status === "Needs Review" && <XCircle className="mr-1 h-3 w-3" />}
              {deduction.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="downloads">Download Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Deduction Information</h3>
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-semibold text-lg">${deduction.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span>{deduction.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer:</span>
                    <span>{details.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Invoice:</span>
                    <span className="font-mono">{details.invoice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reason Code:</span>
                    <span className="font-mono">{deduction.reasonCode}</span>
                  </div>
                </div>

                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Analysis</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{details.reason}</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-800/30 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-2">Recommended Next Steps</h4>
                  <p className="text-sm text-blue-300">{details.nextSteps}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Actions</h3>
                <div className="space-y-3">
                  {deduction.status === "Needs Review" && (
                    <>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Flag className="h-4 w-4 mr-2" />
                        Request Missing Documentation
                      </Button>
                      <Button variant="outline" className="w-full border-gray-600 bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Supporting Docs
                      </Button>
                    </>
                  )}
                  {deduction.status === "Disputable" && (
                    <>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Flag className="h-4 w-4 mr-2" />
                        Initiate Dispute
                      </Button>
                      <Button variant="outline" className="w-full border-gray-600 bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Evidence to Customer
                      </Button>
                    </>
                  )}
                  {deduction.status === "Valid" && (
                    <Button variant="outline" className="w-full border-green-600 text-green-400 bg-transparent">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Processed
                    </Button>
                  )}
                  <Button variant="outline" className="w-full border-gray-600 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full History
                  </Button>
                </div>

                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Document Status</h4>
                  <div className="space-y-2">
                    {details.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${doc.color}-400`}></div>
                          {doc.name}
                        </span>
                        <span className={`text-xs ${doc.status === "available" ? "text-green-400" : "text-red-400"}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Related Documents</h3>
              <div className="grid gap-3">
                {details.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className={`h-5 w-5 text-${doc.color}-400`} />
                      <div>
                        <span className="font-medium">{doc.name}</span>
                        <div className="text-xs text-gray-400">
                          {doc.type} • {doc.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {doc.status === "available" ? (
                        <>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 bg-transparent">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Email History</h3>
              <div className="space-y-3">
                {details.communications.map((comm, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className={`h-4 w-4 ${comm.type === "sent" ? "text-blue-400" : "text-green-400"}`} />
                      <span className="font-medium">{comm.subject}</span>
                      <span className="text-sm text-gray-400 ml-auto">{comm.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{comm.content}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        Reply
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        Forward
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Download Documents</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Individual Documents</h4>
                  <div className="space-y-2">
                    {details.documents
                      .filter((doc) => doc.status === "available")
                      .map((doc, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start border-gray-600 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {doc.name}.{doc.type.toLowerCase()}
                        </Button>
                      ))}
                  </div>
                </div>

                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Bulk Downloads</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-600 text-purple-400 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      All Documents (.zip)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-600 text-blue-400 bg-transparent"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Audit Package (.pdf)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-600 text-green-400 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Thread (.eml)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/30 p-4 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">Audit Trail</h4>
                <p className="text-sm text-blue-300 mb-3">
                  All document downloads are logged for compliance and audit purposes.
                </p>
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Download History
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
