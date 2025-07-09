"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleConnectModal } from "@/components/google-connect-modal"
import { useIntegrations } from "@/context/integration-context"
import Image from "next/image"
import { CheckCircle2, XCircle } from "lucide-react"

export default function IntegrationsPage() {
  const [isModalOpen, setModalOpen] = useState(false)
  const { isGoogleSheetsConnected, disconnectGoogleSheets } = useIntegrations()

  return (
    <div className="flex flex-col w-full">
      <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6 sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Integrations</h1>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Google Sheets</CardTitle>
            <CardDescription>Connect your Google account to automatically sync spreadsheets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-4">
                <Image src="/placeholder.svg?height=40&width=40" width={40} height={40} alt="Google Sheets" />
                <div>
                  <p className="font-semibold">Google Sheets</p>
                  {isGoogleSheetsConnected ? (
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-red-400">
                      <XCircle className="h-4 w-4" />
                      <span>Not Connected</span>
                    </div>
                  )}
                </div>
              </div>
              {isGoogleSheetsConnected ? (
                <Button variant="destructive" onClick={disconnectGoogleSheets}>
                  Disconnect
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 bg-transparent"
                  onClick={() => setModalOpen(true)}
                >
                  Connect
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <GoogleConnectModal isOpen={isModalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
