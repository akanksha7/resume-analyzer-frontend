// import { api } from "@/services/api";
// import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { DialogHeader } from "./ui/dialog";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { DropdownMenuItem } from "./ui/dropdown-menu";
// import { JobDescription } from "@/types/types";

// export function CreateJobDialog({ 
//     catalogId,
//     onJobCreate 
//   }: { 
//     catalogId: string;
//     onJobCreate: (job: JobDescription) => void;
//   }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [open, setOpen] = useState(false);
  
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       try {
//         const job = await api.createJobDescription(catalogId, title, description);
//         onJobCreate(job);
//         setOpen(false);
//         setTitle('');
//         setDescription('');
//       } catch (error) {
//         console.error('Failed to create job:', error);
//       }
//     };
  
//     return (
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <DropdownMenuItem
//             onSelect={(e) => {
//               e.preventDefault();
//               setOpen(true);
//             }}
//             className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
//           >
//             <Plus className="w-4 h-4" />
//             Add Job
//           </DropdownMenuItem>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create New Job Description</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               placeholder="Job Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <Textarea
//               placeholder="Job Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <Button type="submit" className="w-full">Create Job</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     );
//   }