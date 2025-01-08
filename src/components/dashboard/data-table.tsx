import * as React from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Play, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onAnalyzeSelected?: (resumeIds: string[]) => Promise<void>; // Updated type
  selectedRows?: string[];
  setSelectedRows?: (rows: string[]) => void;
  meta?: {
    onViewAnalysis: (resumeId: string) => void;
    onDeleteResume: (resumeId: string) => void;
  };
}
export function ResumeDataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  isLoading,
  onAnalyzeSelected,
  selectedRows = [],
  setSelectedRows,
  meta,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getRowId: (row: TData) => row.id,
    onRowSelectionChange: (updaterOrValue) => {
      if (!setSelectedRows) return;

      const newSelection = 
        typeof updaterOrValue === 'function'
          ? updaterOrValue(table.getState().rowSelection)
          : updaterOrValue;

      const selectedIds = Object.entries(newSelection)
        .filter(([_, selected]) => selected)
        .map(([id]) => id);

      setSelectedRows(selectedIds);
    },
    state: {
      sorting,
      globalFilter,
      rowSelection: Object.fromEntries(
        selectedRows.map((id) => [id, true])
      ),
    },
    meta,
    enableRowSelection: true,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes..."
            value={globalFilter}
            onChange={handleSearchChange}
            className="pl-8 w-full"
            type="search"
          />
        </div>
        <Button
          size="sm"
          onClick={() => onAnalyzeSelected?.(selectedRows)}
          disabled={selectedRows.length === 0 || isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          Analyze {selectedRows.length > 0 && `(${selectedRows.length})`}
        </Button>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-10 px-4 text-muted-foreground font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-72 text-center align-middle"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading resumes...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      <div className="max-w-[200px] truncate" title={typeof cell.getValue() === 'string' ? cell.getValue() as string : undefined}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-72 text-center align-middle"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-lg font-medium">No resumes found</span>
                    <span className="text-sm text-muted-foreground">
                      {globalFilter 
                        ? "Try adjusting your search terms"
                        : "Upload some resumes to get started"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="flex items-center gap-4 order-1 sm:order-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}