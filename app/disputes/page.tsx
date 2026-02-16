import { useState, useEffect } from 'react';
import Spinner from '@/components/ui/spinner'; // or your existing spinner component

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500); // quick simulated loading
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {/* existing page content here */


"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { IntegrationProvider } from "@/context/integration-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, Clock, DollarSign } from "lucide-react"

const disputes = [
  {
    id: "DSP-2024-001",
    distributor: "Walmart",
    amount: "$45,230",
    category: "Promotional",
    status: "In Progress",
    priority: "High",
    daysOpen: 12,
    lastActivity: "2 hours ago",
  },
  {
    id: "DSP-2024-002",
    distributor: "Target",
    amount: "$28,750",
    category: "Pricing",
    status: "Pending Review",
    priority: "Medium",
    daysOpen: 8,
    lastActivity: "1 day ago",
  },
  {
    id: "DSP-2024-003",
    distributor: "Kroger",
    amount: "$67,890",
    category: "Freight",
    status: "Resolved",
    priority: "High",
    daysOpen: 0,
    lastActivity: "3 days ago",
  },
  {
    id: "DSP-2024-004",
    distributor: "Costco",
    amount: "$15,420",
    category: "Damaged Goods",
    status: "New",
    priority: "Low",
    daysOpen: 2,
    lastActivity: "5 hours ago",
  },
  {
    id: "DSP-2024-005",
    distributor: "Home Depot",
    amount: "$92,150",
    category: "Promotional",
    status: "In Progress",
    priority: "High",
    daysOpen: 18,
    lastActivity: "4 hours ago",
  },
]

export default function DisputesPage() {
  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <div className="p-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Disputes Management</h1>
                  <p className="text-gray-400">Track and manage all dispute cases</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Total Disputes</CardTitle>
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">247</div>
                      <p className="text-xs text-gray-400">Active cases</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">In Progress</CardTitle>
                      <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">89</div>
                      <p className="text-xs text-orange-500">Requires attention</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Resolved This Month</CardTitle>
                      <Badge className="h-4 w-4 bg-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">156</div>
                      <p className="text-xs text-green-500">+23% vs last month</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Total Value</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">$2.4M</div>
                      <p className="text-xs text-gray-400">Under dispute</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Disputes</CardTitle>
                    <CardDescription className="text-gray-400">
                      Latest dispute cases requiring attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {disputes.map((dispute, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="text-white font-medium">{dispute.id}</p>
                              <p className="text-sm text-gray-400">{dispute.distributor}</p>
                            </div>
                            <div>
                              <p className="text-white font-semibold">{dispute.amount}</p>
                              <p className="text-sm text-gray-400">{dispute.category}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <Badge
                                variant={
                                  dispute.status === "Resolved"
                                    ? "default"
                                    : dispute.status === "In Progress"
                                      ? "secondary"
                                      : dispute.status === "New"
                                        ? "outline"
                                        : "secondary"
                                }
                                className={
                                  dispute.status === "Resolved"
                                    ? "bg-green-600"
                                    : dispute.status === "In Progress"
                                      ? "bg-orange-600"
                                      : dispute.status === "New"
                                        ? "bg-blue-600"
                                        : "bg-gray-600"
                                }
                              >
                                {dispute.status}
                              </Badge>
                              <p className="text-xs text-gray-400 mt-1">
                                {dispute.daysOpen > 0 ? `${dispute.daysOpen} days open` : "Recently resolved"}
                              </p>
                            </div>

                            <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </IntegrationProvider>
    </TooltipProvider>
  )
}

}
    </div>
  );
}
