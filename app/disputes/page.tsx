"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, XCircle, Clock, Mail } from "lucide-react"

const disputeData = [
  {
    id: "DIS-089",
    status: "Resolved",
    amount: 2100,
    customer: "ABC Distribution",
    lastUpdate: "Recovered $2,100",
    time: "2h ago",
    progress: 100,
  },
  {
    id: "DIS-088",
    status: "In Progress",
    amount: 450,
    customer: "Metro Markets",
    lastUpdate: "Email sent to distributor",
    time: "1d ago",
    progress: 60,
  },
  {
    id: "DIS-087",
    status: "New",
    amount: 350,
    customer: "Global Supply Co",
    lastUpdate: "Deduction flagged for dispute",
    time: "3d ago",
    progress: 10,
  },
  {
    id: "DIS-086",
    status: "In Progress",
    amount: 275,
    customer: "Wholesale Direct",
    lastUpdate: "Awaiting customer response",
    time: "5d ago",
    progress: 40,
  },
]

export default function DisputesPage() {
  return (
    <div className="flex flex-col w-full">
      <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Dispute Resolution</h1>
      </header>

      <main className="flex-1 p-6 md:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-400">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5 days</div>
              <p className="text-xs text-gray-400">-1.2 days improvement</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-gray-400">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Active Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disputeData.map((dispute) => (
                <div
                  key={dispute.id}
                  className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {dispute.status === "Resolved" && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                        {dispute.status === "In Progress" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                        {dispute.status === "New" && <XCircle className="h-5 w-5 text-red-400" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{dispute.id}</h3>
                        <p className="text-sm text-gray-400">{dispute.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${dispute.amount.toLocaleString()}</p>
                      <Badge
                        variant={
                          dispute.status === "Resolved"
                            ? "success"
                            : dispute.status === "In Progress"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {dispute.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">{dispute.lastUpdate}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dispute.time}
                      </span>
                      <span>{dispute.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-purple-500 h-1 rounded-full transition-all"
                        style={{ width: `${dispute.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                      <Mail className="h-3 w-3 mr-1" />
                      Send Email
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
