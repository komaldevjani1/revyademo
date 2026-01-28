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

 const getDeductionDetails = () => {

  // 1️⃣ Target — Shortage — Big Amount
  if (deduction.id === "806803842") {
    return {
      customer: "Target",
      invoice: "CB-806803842",
      reasonCode: "Shortage",
      reason:
        "Shortage values applied on the chargeback are incorrect across all item numbers.The total shortage charge applied was $20,947.16. However, after recalculating the shortage using the packing list quantities and extended unit costs across all item numbers, the cost of the actual shortage totals $14,020.62. As a result, the chargeback exceeds the supported shortage amount by $6,926.54. We are requesting repayment of the unsupported difference. Please see Dispute Detail to find full list of items incorrectly shortage",
      documents: [
        { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
        { name: "Proof of Delivery", type: "PDF", status: "missing", color: "red" },
        { name: "Backup", type: "PDF", status: "available", color: "green" },
        { name: "Packing List", type: "PDF", status: "available", color: "green" },
        { name: "Dispute Detail", type: "CSV", status: "available", color: "green" },
      ],
      communications: [
        {
          type: "received",
          subject: "POD for PO 5503279 | Shortage Dispute",
          time: "2 days ago",
          content:
            "Please send POD for PO 5503279. Target reported $20,947.16 in shortage for PO 5503279, from the packing list we estimated the true shortage cost as as $14,020.62. To dispute the remaining $6,926.54, we need the POD. Thank you",
        },
        {
          type: "sent",
          subject: "RE: POD for PO 5503279 | Shortage Dispute",
          time: "1 day ago",
          content: "Requesting POD for POD for PO 5503279 to dispute $6,926.54.",
        },
      ],
      nextSteps: "Dispute with signed POD evidence showing case count discrepancy.",
    }

  // 2️⃣ Target — Shortage — Smaller Amount
  } else if (deduction.id === "806224215") {
    return {
      customer: "Target",
      invoice: "806224215",
      reasonCode: "Shortage",
      reason:
        "Based on the Proof of Delivery (POD), this shipment was received and signed for in full, with no exceptions or shortages noted at delivery. All products listed on the invoice were confirmed as delivered at the time of receipt. As there is no documented discrepancy on the POD, the reported shortage is not supported by delivery records and appears to be applied in error.",
      documents: [
        { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
        { name: "Proof of Delivery", type: "PDF", status: "available", color: "green" },
        { name: "Packing Slip", type: "PDF", status: "available", color: "green" },
      ],
      communications: [
        {
          type: "received",
          subject: "806224215 | Shortage",
          time: "5 days ago",
          content:
            "Per the Proof of Delivery (POD), this shipment was received and signed for in full, with no exceptions or shortages noted at delivery. All products listed on the invoice were confirmed as delivered at the time of receipt. As there is no documented discrepancy on the POD, the shortage chargeback appears to have been applied in error. Supporting documentation is attached for review.",
        },
        {
          type: "sent",
          subject: "RE: 806224215 | Shortage",
          time: "2 days ago",
          content:
            "Hi Team - bumping the deduction dispute. Per the Proof of Delivery (POD), this shipment was received and signed for in full, with no exceptions or shortages noted at delivery. All products listed on the invoice were confirmed as delivered at the time of receipt. As there is no documented discrepancy on the POD, the shortage chargeback appears to have been applied in error. Supporting documentation is attached for review.",
        },
      ],
      nextSteps: "Follow up until response.",
    }

  // 3️⃣ Target — Substitution
  } else if (deduction.id === "794846216") {
    return {
      customer: "Target",
      invoice: "CB-794846216",
      reasonCode: "Substitution",
      reason:
        "Based on the available records, the substitution appears valid. The originally ordered item was not fulfilled as requested, and a substitute item was used to complete fulfillment in line with substitution policy/approval. The pricing adjustment is consistent with the documented cost difference. As a result, this substitution chargeback is supported by the available documentation and is unlikely to be recoverable.",
      documents: [
        { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
        { name: "Purchase Order (PO)", type: "PDF", status: "available", color: "green" },
        { name: "Proof of Delivery", type: "PDF", status: "available", color: "green" },
        { name: "Substitution Policy / Approval", type: "PDF", status: "available", color: "green" },
        { name: "Deduction Notice", type: "PDF", status: "available", color: "yellow" },
      ],
      communications: [
        {
          type: "",
          subject: "",
          time: "",
          content:
            "",
        },
        {
          type: "",
          subject: "",
          time: "o",
          content:
            "",
        },
      ],
      nextSteps: "",
    }

  // 4️⃣ Walgreens — Unknown
  } else if (deduction.id === "3377973") {
    return {
      customer: "Walgreens",
      invoice: "CB-3377973",
      reasonCode: "Unknown",
      reason:
        "The chargeback document does not list a reason code or description. Without this information, we are unable to validate the deduction. Please provide full backup documentation so we can review and resolve.",
      documents: [
        { name: "Deduction Notice", type: "PDF", status: "available", color: "yellow" },
        { name: "Original Invoice", type: "PDF", status: "missing", color: "red" },
        { name: "Purchase Order (PO)", type: "PDF", status: "missing", color: "red" },
        { name: "Proof of Delivery", type: "PDF", status: "missing", color: "red" },
      ],
      communications: [
        {
          type: "sent",
          subject: "3377973 | Request for Backup",
          time: "1 day ago",
          content:
            "Please provide the reason code and supporting documentation (PO, invoice, POD, calculation) so we can review this deduction.",
        },
      ],
      nextSteps: "Await documentation to determine dispute validity.",
    }

  // 5️⃣ Ulta — Delay
  } else if (deduction.id === "1000189844") {
    return {
      customer: "Ulta",
      invoice: "CB-1000189844",
      reasonCode: "Delay",
      reason:
        "Based on POD and carrier timestamps, the shipment was delivered within the required delivery window and accepted without exception. No qualifying delay event is supported by the records, indicating the chargeback was applied in error.",
      documents: [
        { name: "Original Invoice", type: "PDF", status: "available", color: "blue" },
        { name: "Proof of Delivery", type: "PDF", status: "available", color: "green" },
        { name: "Carrier Tracking", type: "PDF", status: "available", color: "green" },
        { name: "Purchase Order (PO)", type: "PDF", status: "available", color: "green" },
      ],
      communications: [
        {
          type: "sent",
          subject: "1000189844 | Delay Dispute",
          time: "3 days ago",
          content:
            "Per POD and carrier tracking, delivery occurred on time. Attached documentation supports dispute of the delay chargeback.",
        },
      ],
      nextSteps: "Submit dispute with POD and carrier tracking.",
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
                    <span className="font-mono">{details.reasonCode}</span>
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
