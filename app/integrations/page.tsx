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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, CheckCircle, AlertCircle, Clock } from "lucide-react"

const integrations = [
  {
    name: "SAP ERP",
    description: "Enterprise resource planning integration",
    status: "Connected",
    lastSync: "2 minutes ago",
    icon: "🏢",
  },
  {
    name: "Salesforce",
    description: "Customer relationship management",
    status: "Connected",
    lastSync: "5 minutes ago",
    icon: "☁️",
  },
  {
    name: "QuickBooks",
    description: "Accounting and financial management",
    status: "Pending",
    lastSync: "Never",
    icon: "📊",
  },
  {
    name: "Oracle NetSuite",
    description: "Cloud business management suite",
    status: "Error",
    lastSync: "2 hours ago",
    icon: "🔶",
  },
  {
    name: "Microsoft Dynamics",
    description: "Business applications platform",
    status: "Connected",
    lastSync: "1 hour ago",
    icon: "🔷",
  },
  {
    name: "Walmart EDI",
    description: "Electronic data interchange",
    status: "Connected",
    lastSync: "30 minutes ago",
    icon: "🛒",
  },
]

export default function IntegrationsPage() {
  return (
    <TooltipProvider>
      <IntegrationProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-gray-950 text-gray-50">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <div className="p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Integrations</h1>
                      <p className="text-gray-400">Connect your business systems and data sources</p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Integration
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Connected</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">4</div>
                      <p className="text-xs text-green-500">Active integrations</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
                      <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">1</div>
                      <p className="text-xs text-yellow-500">Awaiting setup</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Issues</CardTitle>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">1</div>
                      <p className="text-xs text-red-500">Requires attention</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations.map((integration, index) => (
                    <Card key={index} className="bg-gray-900 border-gray-800">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{integration.icon}</div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-white">{integration.name}</CardTitle>
                              <Badge
                                variant={
                                  integration.status === "Connected"
                                    ? "default"
                                    : integration.status === "Pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className={
                                  integration.status === "Connected"
                                    ? "bg-green-600"
                                    : integration.status === "Pending"
                                      ? "bg-yellow-600"
                                      : "bg-red-600"
                                }
                              >
                                {integration.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-gray-400">{integration.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-400">
                            Last sync: <span className="text-white">{integration.lastSync}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-gray-800 border-gray-700 text-gray-300"
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                            {integration.status === "Connected" && (
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                Sync Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
