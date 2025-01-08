// columns.tsx
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import * as Dialog from '@radix-ui/react-dialog'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink, FileText, Trash2 } from "lucide-react"
import { useState } from "react"

export interface ResumeData {
  id: string;
  filename: string;
  s3_url?: string;
  is_analyzed: boolean;  
  match_score: number | null;
}

interface TableMeta {
  onViewAnalysis: (resumeId: string) => void;
  onDeleteResume: (resumeId: string) => void;
}

interface ResumeViewerProps {
  url: string;
  filename: string;
  isOpen: boolean;
  onClose: () => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ url, filename, isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-background rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <Dialog.Title className="text-lg font-semibold">{filename}</Dialog.Title>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
          <div className="flex-1 p-4">
            <iframe 
              src={url} 
              className="w-full h-full rounded border"
              title={filename}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const columns: ColumnDef<ResumeData, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-1">
        <Checkbox
          className="h-4 w-4 rounded-sm data-[state=checked]:bg-primary"
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    cell: ({ row }) => {
      const [isViewerOpen, setIsViewerOpen] = useState(false);
      return (
        <div className="pl-4 font-medium group flex items-center gap-2">
          <Button
            variant="link"
            className="p-0 h-auto font-medium"
            onClick={() => setIsViewerOpen(true)}
          >
            <span className="truncate hover:underline" title={row.getValue("filename")}>
              {row.getValue("filename")}
            </span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          {row.original.s3_url && (
            <ResumeViewer
              url={row.original.s3_url}
              filename={row.getValue("filename")}
              isOpen={isViewerOpen}
              onClose={() => setIsViewerOpen(false)}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "is_analyzed", 
    header: ({ column }) => (
      <div className="text-center">Status</div>
    ),
    cell: ({ row }) => {
      const isAnalyzed = row.getValue("is_analyzed") as boolean;
      return (
        <div className="text-center">
          <span className={cn(
            "px-2 py-1 text-xs font-medium",
            isAnalyzed
              ? "text-green-600" 
              : "text-muted-foreground"
          )}>
            {isAnalyzed ? 'Analyzed' : 'Queued'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "match_score",  
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
      );
    },
    cell: ({ row }) => {
      const isAnalyzed = row.getValue("is_analyzed") as boolean;
      const score = row.getValue("match_score") as number | null;
  
      return (
        <div className="text-center">
          <span className={cn(
            "font-medium",
            isAnalyzed && score !== null
              ? score >= 80
                ? "text-green-600"
                : "text-red-600"
              : "text-muted-foreground"
          )}>
            {isAnalyzed && score !== null ? `${score}%` : '-'}
          </span>
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as number | null;
      const b = rowB.getValue(columnId) as number | null;
      const isAnalyzedA = rowA.getValue("is_analyzed") as boolean;
      const isAnalyzedB = rowB.getValue("is_analyzed") as boolean;
  
      if (!isAnalyzedA && isAnalyzedB) return 1;
      if (isAnalyzedA && !isAnalyzedB) return -1;
      if (a === null && b === null) return 0;
      if (a === null) return 1;
      if (b === null) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-4">Actions</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta;
      const resume = row.original;
  
      return (
        <div className="flex justify-end gap-2 pr-4">
          {resume.is_analyzed && ( 
            <Button
              variant="outline"
              size="sm"
              onClick={() => meta?.onViewAnalysis?.(resume.id)}
              className="h-8"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => meta?.onDeleteResume?.(resume.id)}
            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];