"use client"

import { useState } from "react"
import { RevyaDashboard } from "@/components/revya-dashboard"
import { LoginPage } from "@/components/login-page"
import { IntegrationProvider } from "@/context/integration-context"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <IntegrationProvider>
      <RevyaDashboard />
    </IntegrationProvider>
  )
}
