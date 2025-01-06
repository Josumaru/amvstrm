import { Calendar, Home, Inbox, Search, BookAudioIcon, User2, MapPinIcon, HomeIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Blog",
    url: "/dashboard/blog",
    icon: BookAudioIcon,
  },
  {
    title: "Pengguna",
    url: "/dashboard/pengguna",
    icon: User2,
  },
  {
    title: "Shopee Page Sources",
    url: "/dashboard/produk",
    icon: Inbox,
  },
  {
    title: "Map Mitra",
    url: "/dashboard/map",
    icon: MapPinIcon,
  },
  {
    title: "Beranda",
    url: "/beranda",
    icon: HomeIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-zinc-300">
      <SidebarContent className="bg-zinc-50 text-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-[#ffffff1a] hover:text-zinc-800">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
