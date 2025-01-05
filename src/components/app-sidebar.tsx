// components/app-sidebar.tsx
import * as React from "react"
import { ChevronRight, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { NavUser } from "@/components/nav-user"
import { Button } from "@/components/ui/button"
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateCatalogDialog } from "./create-catalog-dialog"
import { api } from "@/services/api"
import { ActiveJob } from "@/types/types"

// Types
interface JobDescription {
  id: string;
  title: string;
  description: string;
  catalog_id: string;
}

interface Catalog {
  id: string;
  name: string;
  description: string;
  items?: JobDescription[];
}


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onJobSelect: (job: JobDescription & { catalogName: string }) => void;
  onCreateJob: (catalogId: string, catalogName: string) => void;
  onCatalogSelect: (catalog: { id: string; name: string }) => void;
  onCatalogDelete: (catalogId: string) => void;
  onJobUpdate?: (updatedJob: ActiveJob) => void;
  onJobDelete?: (catalogId: string, jobId: string) => void;
}

export function AppSidebar({ 
  onJobSelect, 
  onCreateJob, 
  onCatalogSelect, 
  onCatalogDelete,
  onJobUpdate,
  onJobDelete,
  ...props 
}: AppSidebarProps) {
  const [catalogs, setCatalogs] = React.useState<Catalog[]>([]);
  const [activeJobId, setActiveJobId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [openCatalogId, setOpenCatalogId] = React.useState<string | null>(null);
  const initialFetchRef = React.useRef(false);

  const fetchCatalogs = React.useCallback(async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const data = await api.getCatalogs(page);
      if (data.length < 10) {
        setHasMore(false);
      }
      if (page === 1) {
        setCatalogs(data);
      } else {
        setCatalogs(prev => [...prev, ...data]);
      }
    } catch (error) {
      console.error('Failed to fetch catalogs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  const fetchJobDescriptions = React.useCallback(async (catalogId: string) => {
    try {
      const jobs = await api.getJobDescriptions(catalogId);
      setCatalogs(prevCatalogs =>
        prevCatalogs.map(catalog =>
          catalog.id === catalogId
            ? { ...catalog, items: jobs }
            : catalog
        )
      );
    } catch (error) {
      console.error('Failed to fetch job descriptions:', error);
      // Set empty array on error to show "No jobs yet" message
      setCatalogs(prevCatalogs =>
        prevCatalogs.map(catalog =>
          catalog.id === catalogId
            ? { ...catalog, items: [] }
            : catalog
        )
      );
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchCatalogs();
    }
  }, [fetchCatalogs]);

  // Handle pagination
  React.useEffect(() => {
    if (initialFetchRef.current && page > 1) {
      fetchCatalogs();
    }
  }, [page, fetchCatalogs]);

  const handleCatalogCreate = (catalog: Catalog) => {
    setCatalogs(prev => [catalog, ...prev]);
  };

  const handleDeleteCatalog = (catalogId: string) => {
    setCatalogs(prev => prev.filter(catalog => catalog.id !== catalogId));
    if (catalogId === openCatalogId) {
      setOpenCatalogId(null);
    }
    onCatalogDelete(catalogId);
  };

  const handleJobClick = (job: JobDescription, catalogName: string) => {
    setActiveJobId(job.id);
    onJobSelect({ ...job, catalogName });
  };

  const handleCatalogClick = (catalog: Catalog, isOpen: boolean) => {
    setOpenCatalogId(isOpen ? catalog.id : null);
    onCatalogSelect(catalog);
    if (isOpen && (!catalog.items || catalog.items.length === 0)) {
      fetchJobDescriptions(catalog.id);
    }
  };

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
          <SidebarGroupLabel>Job Catalogs</SidebarGroupLabel>
          <CreateCatalogDialog onCatalogCreate={handleCatalogCreate} />
        </SidebarGroup>

        {catalogs.map((catalog) => (
          <Collapsible 
            key={catalog.id} 
            open={openCatalogId === catalog.id}
            onOpenChange={(isOpen) => handleCatalogClick(catalog, isOpen)}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                <span className="flex-1">{catalog.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => onCreateJob(catalog.id, catalog.name)}
                      className="cursor-pointer"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Job
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteCatalog(catalog.id)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Catalog
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {catalog.items === undefined ? (
                      <SidebarMenuItem>
                        <span className="text-sm text-muted-foreground px-4 py-2">
                          Loading...
                        </span>
                      </SidebarMenuItem>
                    ) : catalog.items.length === 0 ? (
                      <SidebarMenuItem>
                        <span className="text-sm text-muted-foreground px-4 py-2">
                          No jobs yet
                        </span>
                      </SidebarMenuItem>
                    ) : (
                      <SidebarMenuSub>
                        {catalog.items.map((job) => (
                          <SidebarMenuSubItem key={job.id}>
                            <SidebarMenuSubButton
                              isActive={job.id === activeJobId}
                              onClick={() => handleJobClick(job, catalog.name)}
                            >
                              {job.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}

        {/* {hasMore && (
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setPage(p => p + 1)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )} */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}