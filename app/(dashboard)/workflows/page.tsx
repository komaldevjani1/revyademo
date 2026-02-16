"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Settings, Plus, GitBranch, Clock, CheckCircle } from "lucide-react"

const workflows = [
  {
    name: "Auto Deduction Processing",
    description: "Automatically process and categorize incoming deductions",
    status: "Active",
    lastRun: "5 minutes ago",
    successRate: "94.2%",
    totalRuns: 1247,
  },
  {
    name: "Dispute Escalation",
    description: "Escalate high-value disputes to senior analysts",
    status: "Active",
    lastRun: "2 hours ago",
    successRate: "87.5%",
    totalRuns: 89,
  },
  {
    name: "Recovery Notification",
    description: "Send notifications when recovery is completed",
    status: "Paused",
    lastRun: "1 day ago",
    successRate: "98.1%",
    totalRuns: 456,
  },
  {
    name: "Weekly Report Generation",
    description: "Generate and distribute weekly performance reports",
    status: "Active",
    lastRun: "3 days ago",
    successRate: "100%",
    totalRuns: 52,
  },
  {
    name: "Data Validation",
    description: "Validate incoming data for accuracy and completeness",
    status: "Active",
    lastRun: "1 minute ago",
    successRate: "91.8%",
    totalRuns: 2341,
  },
  {
    name: "Customer Communication",
    description: "Automated customer updates on dispute status",
    status: "Draft",
    lastRun: "Never",
    successRate: "N/A",
    totalRuns: 0,
  },
]

export default function WorkflowsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Workflows</h2>
            <p className="text-gray-400">Automate your deduction recovery processes</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Workflows</CardTitle>
            <GitBranch className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4</div>
            <p className="text-xs text-green-500">Running smoothly</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Executions</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4,185</div>
            <p className="text-xs text-blue-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">93.7%</div>
            <p className="text-xs text-green-500">Above target</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">247h</div>
            <p className="text-xs text-purple-500">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white mb-2">{workflow.name}</CardTitle>
                  <Badge
                    variant={
                      workflow.status === "Active"
                        ? "default"
                        : workflow.status === "Paused"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      workflow.status === "Active"
                        ? "bg-green-600"
                        : workflow.status === "Paused"
                          ? "bg-yellow-600"
                          : "bg-gray-600"
                    }
                  >
                    {workflow.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {workflow.status === "Active" ? (
                    <Button size="sm" variant="outline" className="bg-gray-800 border-gray-700">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="bg-gray-800 border-gray-700">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="bg-gray-800 border-gray-700">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Last run:</span>
                  <span className="text-white">{workflow.lastRun}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Success rate:</span>
                  <span className="text-green-500">{workflow.successRate}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Total runs:</span>
                  <span className="text-white">{workflow.totalRuns.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
