"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Plug,
  Settings,
  LifeBuoy,
  UserCircle,
  ChevronUp,
  BarChart3,
  TrendingUp,
  GitBranch,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Deductions", href: "/deductions", icon: FileText },
  { title: "Disputes", href: "/disputes", icon: ShieldCheck },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Analytics", href: "/analytics", icon: TrendingUp },
  { title: "Integrations", href: "/integrations", icon: Plug },
  { title: "Workflows", href: "/workflows", icon: GitBranch },
  { title: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-gray-800">
      <SidebarHeader className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src="/revya-logo-white.png" alt="Revya" className="h-8" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="w-full justify-start px-3 py-2.5 text-sm font-medium"
                  >
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start px-3 py-2.5">
              <LifeBuoy className="h-5 w-5 mr-3" />
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start px-3 py-2.5">
                  <UserCircle className="h-5 w-5 mr-3" />
                  <span>Komal Devjani</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-popper-anchor-width] bg-gray-900 border-gray-800 text-gray-50"
              >
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Audit Logs</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
