import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, FileText, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeData {
  id: string;
  filename: string;
  analysisStatus: 'queued' | 'completed';
  matchScore: number;
}

export const columns: ColumnDef<ResumeData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-1">
        <Checkbox
          className="h-4 w-4 rounded-sm data-[state=checked]:bg-primary"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          className="h-4 w-4 rounded-sm data-[state=checked]:bg-primary"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <div className="pl-4">Resume</div>
    ),
    cell: ({ row }) => (
      <div className="pl-4 font-medium">{row.getValue("filename")}</div>
    ),
  },
  {
    accessorKey: "analysisStatus",
    header: ({ column }) => (
      <div className="text-center">Status</div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("analysisStatus") as string
      return (
        <div className="text-center">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            status === 'completed' 
              ? "bg-green-50 text-green-600" 
              : "bg-gray-100 text-muted-foreground"
          )}>
            {status === 'completed' ? 'Analyzed' : 'Queued'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "matchScore",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Match Score
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("analysisStatus") as string
      const score = row.getValue("matchScore") as number

      return (
        <div className="text-center">
          <span className={cn(
            "font-medium",
            status === 'completed'
              ? score >= 80
                ? "text-green-600"
                : "text-red-600"
              : "text-muted-foreground"
          )}>
            {status === 'completed' ? `${score}%` : '-'}
          </span>
        </div>
      )
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as number
      const b = rowB.getValue(columnId) as number
      const statusA = rowA.getValue("analysisStatus") as string
      const statusB = rowB.getValue("analysisStatus") as string

      if (statusA === 'queued' && statusB === 'completed') return 1
      if (statusA === 'completed' && statusB === 'queued') return -1
      return a < b ? -1 : a > b ? 1 : 0
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-4">Actions</div>,
    cell: ({ row, table }) => {
      const resume = row.original
      const { onViewAnalysis, onDeleteResume } = table.options.meta as any

      return (
        <div className="flex justify-end gap-2 pr-4">
          {resume.analysisStatus === 'completed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewAnalysis?.(resume.id)}
              className="h-8"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteResume?.(resume.id)}
            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
];