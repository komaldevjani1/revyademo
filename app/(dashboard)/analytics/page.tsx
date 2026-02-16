"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Users, Clock } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Analytics</h2>
        <p className="text-gray-400">Advanced insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Recovery Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78.5%</div>
            <p className="text-xs text-green-500">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">14.2 days</div>
            <p className="text-xs text-green-500">-2.1 days improvement</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85.7%</div>
            <p className="text-xs text-green-500">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Disputes</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">247</div>
            <p className="text-xs text-red-500">+18 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Distributors</CardTitle>
            <CardDescription className="text-gray-400">
              Distributors with highest recovery rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Walmart", rate: "92.3%", amount: "$1.2M" },
                { name: "Target", rate: "88.7%", amount: "$890K" },
                { name: "Kroger", rate: "85.1%", amount: "$750K" },
                { name: "Costco", rate: "82.4%", amount: "$650K" },
              ].map((distributor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{distributor.name}</p>
                    <p className="text-sm text-gray-400">{distributor.amount} recovered</p>
                  </div>
                  <div className="text-green-500 font-semibold">{distributor.rate}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Deduction Categories</CardTitle>
            <CardDescription className="text-gray-400">Breakdown by deduction type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Promotional", percentage: 35, amount: "$2.1M" },
                { category: "Pricing", percentage: 28, amount: "$1.7M" },
                { category: "Freight", percentage: 20, amount: "$1.2M" },
                { category: "Damaged Goods", percentage: 17, amount: "$1.0M" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white">{item.category}</span>
                    <span className="text-gray-400">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
