"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Mail,
  Download,
  Eye,
  Flag,
  Upload,
  User,
  Calendar,
  Building,
  Hash,
  ExternalLink,
  AlertCircle,
} from "lucide-react"

interface DeductionDrawerProps {
  isOpen: boolean
  onClose: () => void
  deduction: any
}

export function DeductionDrawer({ isOpen, onClose, deduction }: DeductionDrawerProps) {
  if (!deduction) return null

  const getDeductionDetails = () => {
    if (deduction.status === "Needs Review") {
      return {
        customer: "Target Corporation",
        invoice: "INV-2024-8845",
        reason:
          "Promotional bill-back claimed without valid authorization. No matching promotional agreement found in our records for Q4 campaign.",
        documents: [
          { name: "Original Invoice", type: "PDF", status: "available", url: "#" },
          { name: "Promotional Agreement", type: "PDF", status: "missing", url: null },
          { name: "Deduction Notice", type: "PDF", status: "available", url: "#" },
          { name: "Email Thread", type: "EML", status: "available", url: "#" },
        ],
        communications: [
          {
            type: "received",
            subject: "Q4 Promotional Deduction Claim",
            time: "5 days ago",
            from: "ap@target.com",
            content:
              "Target is claiming $8,420.50 promotional allowance for Q4 holiday campaign. Requesting documentation to verify authorization and terms.",
          },
          {
            type: "sent",
            subject: "RE: Q4 Promotional Deduction - Documentation Request",
            time: "3 days ago",
            from: "finance@yourcompany.com",
            content:
              "We cannot locate a promotional agreement for the claimed amount. Please provide the signed promotional agreement and campaign details for verification.",
          },
        ],
        nextSteps:
          "Request promotional agreement documentation from Target to verify claim validity. If no agreement exists, initiate dispute process.",
        timeline: [
          { date: "2024-12-16", event: "Deduction received", type: "system" },
          { date: "2024-12-17", event: "Auto-flagged for review", type: "system" },
          { date: "2024-12-18", event: "Assigned to Sarah Chen", type: "manual" },
          { date: "2024-12-19", event: "Documentation requested", type: "manual" },
        ],
      }
    } else if (deduction.status === "Disputable") {
      return {
        customer: deduction.distributor,
        invoice: `INV-2024-${deduction.id.split("-")[2]}`,
        reason: deduction.description + ". Analysis shows discrepancy with historical data and delivery records.",
        documents: [
          { name: "Original Invoice", type: "PDF", status: "available", url: "#" },
          { name: "Delivery Receipt", type: "PDF", status: "available", url: "#" },
          { name: "Spoilage Report", type: "PDF", status: "available", url: "#" },
          { name: "Photo Evidence", type: "JPG", status: "available", url: "#" },
          { name: "Historical Analysis", type: "PDF", status: "generated", url: "#" },
        ],
        communications: [
          {
            type: "received",
            subject: "Spoilage Claim Notification",
            time: "3 days ago",
            from: `claims@${deduction.distributor.toLowerCase()}.com`,
            content: `${deduction.distributor} reporting spoilage claim of $${deduction.amount.toLocaleString()} due to temperature control failure during transport.`,
          },
          {
            type: "system",
            subject: "Automated Analysis Complete",
            time: "2 days ago",
            from: "system@revya.ai",
            content:
              "AI analysis flagged this claim as 340% above historical average for similar shipments. Recommend dispute with evidence package.",
          },
        ],
        nextSteps:
          "Initiate dispute with historical analysis and delivery documentation. System recommends high probability of successful recovery.",
        timeline: [
          { date: "2024-12-15", event: "Deduction received", type: "system" },
          { date: "2024-12-15", event: "AI analysis triggered", type: "system" },
          { date: "2024-12-16", event: "Flagged as disputable", type: "system" },
          { date: "2024-12-17", event: "Evidence package prepared", type: "system" },
        ],
      }
    } else {
      return {
        customer: deduction.distributor,
        invoice: `INV-2024-${deduction.id.split("-")[2]}`,
        reason: "Verified claim with proper documentation and supporting evidence.",
        documents: [
          { name: "Original Invoice", type: "PDF", status: "available", url: "#" },
          { name: "Damage Report", type: "PDF", status: "available", url: "#" },
          { name: "Carrier Receipt", type: "PDF", status: "available", url: "#" },
          { name: "Damage Photos", type: "JPG", status: "available", url: "#" },
        ],
        communications: [
          {
            type: "received",
            subject: "Freight Damage Claim",
            time: "7 days ago",
            from: `claims@${deduction.distributor.toLowerCase()}.com`,
            content: `${deduction.distributor} reporting freight damage to shipment. Damage photos and carrier report attached for verification.`,
          },
          {
            type: "sent",
            subject: "RE: Freight Damage Claim - Approved",
            time: "6 days ago",
            from: "finance@yourcompany.com",
            content: "Claim approved based on carrier damage report and photographic evidence. Processing credit memo.",
          },
        ],
        nextSteps: "Claim approved and processed. Credit memo issued.",
        timeline: [
          { date: "2024-12-14", event: "Deduction received", type: "system" },
          { date: "2024-12-14", event: "Auto-validated", type: "system" },
          { date: "2024-12-15", event: "Credit memo issued", type: "manual" },
          { date: "2024-12-16", event: "Case closed", type: "system" },
        ],
      }
    }
  }

  const details = getDeductionDetails()

  const hasMissingInfo = details.documents.some((doc) => doc.status === "missing")
  const missingDocCount = details.documents.filter((doc) => doc.status === "missing").length

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl bg-gray-900 border-gray-800 text-gray-50 overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3">
              {deduction.id}
              <Badge
                className={
                  deduction.status === "Valid"
                    ? "text-green-400 bg-green-400/10 border-green-400/20"
                    : deduction.status === "Disputable"
                      ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                      : "text-red-400 bg-red-400/10 border-red-400/20"
                }
              >
                {deduction.status === "Valid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                {deduction.status === "Disputable" && <AlertTriangle className="mr-1 h-3 w-3" />}
                {deduction.status === "Needs Review" && <XCircle className="mr-1 h-3 w-3" />}
                {deduction.status}
              </Badge>
              {hasMissingInfo && (
                <Badge className="text-orange-400 bg-orange-400/10 border-orange-400/20">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  {missingDocCount} Missing
                </Badge>
              )}
            </SheetTitle>
            <div className="text-right">
              <div className="text-2xl font-bold">${deduction.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-400">{deduction.aging} days open</div>
            </div>
          </div>
          <SheetDescription className="text-gray-400">
            Comprehensive deduction analysis and dispute management
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">
              Documents
              {hasMissingInfo && <span className="ml-1 inline-flex h-2 w-2 rounded-full bg-orange-400" />}
            </TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Customer</span>
                </div>
                <div className="font-semibold">{details.customer}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Invoice</span>
                </div>
                <div className="font-mono text-sm">{details.invoice}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Date</span>
                </div>
                <div>{deduction.date}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Owner</span>
                </div>
                <div>{deduction.owner}</div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {hasMissingInfo && (
              <div className="bg-orange-900/20 border border-orange-800/30 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-orange-400 mb-1">Missing Information</h4>
                  <p className="text-sm text-orange-300">
                    {missingDocCount} required {missingDocCount === 1 ? "document is" : "documents are"} missing. Please
                    upload or request the missing documentation to proceed with dispute.
                  </p>
                </div>
              </div>
            )}

            {/* Analysis */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">AI Analysis</h3>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-300 leading-relaxed">{details.reason}</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recommended Actions</h3>
              <div className="bg-blue-900/20 border border-blue-800/30 p-4 rounded-lg">
                <p className="text-sm text-blue-300">{details.nextSteps}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Actions</h3>

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                disabled={hasMissingInfo}
              >
                <Flag className="h-4 w-4 mr-2" />
                {hasMissingInfo ? "Complete Documentation to Dispute" : "Initiate Dispute"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                {deduction.status === "Needs Review" && (
                  <>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Flag className="h-4 w-4 mr-2" />
                      Request Documentation
                    </Button>
                    <Button variant="outline" className="border-gray-600 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Evidence
                    </Button>
                  </>
                )}
                {deduction.status === "Disputable" && (
                  <>
                    <Button variant="outline" className="border-gray-600 bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Evidence
                    </Button>
                    <Button variant="outline" className="border-gray-600 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Docs
                    </Button>
                  </>
                )}
                {deduction.status === "Valid" && (
                  <Button variant="outline" className="border-green-600 text-green-400 bg-transparent col-span-2">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Processed
                  </Button>
                )}
                <Button variant="outline" className="border-gray-600 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full History
                </Button>
                <Button variant="outline" className="border-gray-600 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Case
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg">Related Documents</h3>
            <div className="space-y-3">
              {details.documents.map((doc, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    doc.status === "missing" ? "bg-orange-900/20 border border-orange-800/30" : "bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className={`h-5 w-5 ${
                        doc.status === "available"
                          ? "text-green-400"
                          : doc.status === "missing"
                            ? "text-orange-400"
                            : "text-blue-400"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.name}</span>
                        {doc.status === "missing" && (
                          <Badge className="text-xs text-orange-400 bg-orange-400/10 border-orange-400/20">
                            Required
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {doc.type} • {doc.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {doc.status === "available" || doc.status === "generated" ? (
                      <>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" className="border-orange-600 text-orange-400 bg-transparent">
                        <Upload className="h-4 w-4 mr-1" />
                        Request
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg">Communication History</h3>
            <div className="space-y-4">
              {details.communications.map((comm, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail
                      className={`h-4 w-4 ${
                        comm.type === "sent"
                          ? "text-blue-400"
                          : comm.type === "system"
                            ? "text-purple-400"
                            : "text-green-400"
                      }`}
                    />
                    <span className="font-medium">{comm.subject}</span>
                    <span className="text-sm text-gray-400 ml-auto">{comm.time}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">From: {comm.from}</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{comm.content}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Full
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg">Case Timeline</h3>
            <div className="space-y-4">
              {details.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${event.type === "system" ? "bg-blue-400" : "bg-green-400"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{event.event}</span>
                      <span className="text-sm text-gray-400">{event.date}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{event.type === "system" ? "Automated" : "Manual"}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
