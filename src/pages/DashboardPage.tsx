import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UploadCloud} from 'lucide-react';
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const Dashboard = () => {
 const [jobDesc, setJobDesc] = useState('');
 const [jobTitle, setJobTitle] = useState('');
 const [progress, setProgress] = useState(0);
 const [files, setFiles] = useState<File[]>([]);

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files) {
     setFiles(Array.from(e.target.files));
   }
 };

 return (
   <div className="min-h-screen bg-background flex">
     {/* Sidebar */}
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {/* {catalog.name} */}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {/* <BreadcrumbPage>{job.name}</BreadcrumbPage> */}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex-1 p-8">
       {/* <Card className="max-w-4xl mx-auto p-6">
         <div className="space-y-6">
           {/* Job Title Input */}
           {/* <div>
             <label className="block text-sm font-medium text-foreground mb-2">
               Job Title
             </label>
             <Input
               value={jobTitle}
               onChange={(e) => setJobTitle(e.target.value)}
               placeholder="Enter job title"
               className="w-full"
             />
           </div> */}

           {/* Job Description */}
           {/* <div>
             <label className="block text-sm font-medium text-foreground mb-2">
               Job Description
             </label>
             <Textarea
               value={jobDesc}
               onChange={(e) => setJobDesc(e.target.value)}
               placeholder="Paste job description here..."
               className="min-h-[200px]"
             />
           </div> */}

           {/* Resume Upload */}
           {/* <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
             <Input
               type="file"
               onChange={handleFileUpload}
               multiple
               accept=".pdf,.doc,.docx"
               className="hidden"
               id="file-upload"
             />
             <label 
               htmlFor="file-upload"
               className="cursor-pointer flex flex-col items-center"
             >
               <UploadCloud className="h-12 w-12 text-primary mb-4" />
               <span className="text-foreground-muted">
                 Upload Resumes (PDF, DOC, DOCX)
               </span>
               {files.length > 0 && (
                 <span className="text-sm text-primary mt-2">
                   {files.length} files selected
                 </span>
               )}
             </label>
           </div> */}

           {/* Progress Bar */}
           {/* {progress > 0 && (
             <Progress value={progress} className="w-full" />
           )} */}

           {/* Analyze Button */}
           {/* <Button 
             className="w-full"
             disabled={!jobTitle || !jobDesc || files.length === 0}
           >
             Analyze Resumes
           </Button>
         </div>
       </Card> */} 
     </div>
      </SidebarInset>
    </SidebarProvider>

     {/* Main Content */}
     
   </div>
 );
};

export default Dashboard;