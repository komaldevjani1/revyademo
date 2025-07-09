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
} from "lucide-react"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const menuItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Deductions", href: "/deductions", icon: FileText },
  { title: "Disputes", href: "/disputes", icon: ShieldCheck },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Integrations", href: "/integrations", icon: Plug },
  { title: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img src="/revya-logo-white.png" alt="Revya" className="h-8 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <a href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help & Support">
              <LifeBuoy className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <UserCircle className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Komal Devjani</span>
                  <ChevronUp className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
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
