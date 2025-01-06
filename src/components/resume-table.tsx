// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import type { Resume } from '@/types/types';
// import { Trash2 } from 'lucide-react';
// import { Button } from './ui/button';
// import { Eye } from 'lucide-react';

// interface ResumeTableProps {
//   resumes: Resume[];
//   onDelete?: (resumeId: string) => void;
//   onView?: (resumeId: string) => void;
// }

// export function ResumeTable({ resumes, onDelete, onView }: ResumeTableProps) {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Resume Name</TableHead>
//           <TableHead className="text-right">Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {resumes.map((resume) => (
//           <TableRow key={resume.id}>
//             <TableCell>{resume.filename}</TableCell>
           
//             <TableCell className="text-right">
//               <div className="flex justify-end gap-2">
//                 {onView && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => onView(resume.id)}
//                   >
//                     <Eye className="h-4 w-4" />
//                     <span className="sr-only">View</span>
//                   </Button>
//                 )}
//                 {onDelete && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => onDelete(resume.id)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                     <span className="sr-only">Delete</span>
//                   </Button>
//                 )}
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//         {resumes.length === 0 && (
//           <TableRow>
//             <TableCell colSpan={3} className="text-center text-muted-foreground">
//               No resumes uploaded yet
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// } 