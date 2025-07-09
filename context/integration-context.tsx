"use client"

import type React from "react"
import { createContext, useState, useContext, useCallback } from "react"

interface IntegrationContextType {
  isGoogleSheetsConnected: boolean
  connectGoogleSheets: () => void
  disconnectGoogleSheets: () => void
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined)

export function useIntegrations() {
  const context = useContext(IntegrationContext)
  if (!context) {
    throw new Error("useIntegrations must be used within an IntegrationProvider")
  }
  return context
}

export function IntegrationProvider({ children }: { children: React.ReactNode }) {
  const [isGoogleSheetsConnected, setIsGoogleSheetsConnected] = useState(false)

  const connectGoogleSheets = useCallback(() => {
    setIsGoogleSheetsConnected(true)
  }, [])

  const disconnectGoogleSheets = useCallback(() => {
    setIsGoogleSheetsConnected(false)
  }, [])

  const value = {
    isGoogleSheetsConnected,
    connectGoogleSheets,
    disconnectGoogleSheets,
  }

  return <IntegrationContext.Provider value={value}>{children}</IntegrationContext.Provider>
}
