import * as React from "react"
import { ChevronRight, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { addCatalog } from "@/services/api"
import { SearchForm } from "@/components/search-form"
import { NavUser } from "@/components/nav-user"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

const userdata = {
  name: "test",
  email: "string",
  avatar: "string"
}

const data = {
  navMain: [
    {
      title: "IBM",
      url: "#",
      items: [
        {
          title: "Software Engineer 2",
          url: "#",
        },
        {
          title: "Technical Specialist",
          url: "#",
        },
      ],
    },
    {
      title: "Meta",
      url: "#",
      items: [
        {
          title: "Manager",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="text-xl font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center py-4"
            >
              <span>TalentTuner</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Catalogs</SidebarGroupLabel>
          <SidebarGroupAction title="Add Catalog" className="flex items-center gap-2">
            <Plus className="w-4 h-4" onClick={() => addCatalog()}/>
          </SidebarGroupAction>
        </SidebarGroup>

        {/* Collapsible SidebarGroups */}
        {data.navMain.map((parent) => (
          <Collapsible key={parent.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                <span className="flex-1">{parent.title}</span>
                {/* Dropdown menu for "..." options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md rounded-md p-1">
                    <DropdownMenuItem
                      onSelect={() => console.log(`Add Job to ${parent.title}`)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <Plus className="w-4 h-4" />
                      Add Job
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => console.log(`Delete Job from ${parent.title}`)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Job
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* ChevronRight for collapsible trigger */}
                <CollapsibleTrigger asChild>
                  <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {parent.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild isActive={subItem.isActive}>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userdata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
