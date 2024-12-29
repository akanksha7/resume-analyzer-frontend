// src/pages/Dashboard.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UploadCloud, Settings, Home, PieChart } from 'lucide-react';

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
     <div className="w-64 bg-background-secondary border-r border-border">
       <div className="p-6">
         <h2 className="text-lg font-semibold text-foreground mb-6">Dashboard</h2>
         <nav className="space-y-2">
           <Button variant="ghost" className="w-full justify-start">
             <Home className="mr-2 h-4 w-4" />
             Home
           </Button>
           <Button variant="ghost" className="w-full justify-start">
             <PieChart className="mr-2 h-4 w-4" />
             Analytics
           </Button>
           <Button variant="ghost" className="w-full justify-start">
             <Settings className="mr-2 h-4 w-4" />
             Settings
           </Button>
         </nav>
       </div>
     </div>

     {/* Main Content */}
     <div className="flex-1 p-8">
       <Card className="max-w-4xl mx-auto p-6">
         <div className="space-y-6">
           {/* Job Title Input */}
           <div>
             <label className="block text-sm font-medium text-foreground mb-2">
               Job Title
             </label>
             <Input
               value={jobTitle}
               onChange={(e) => setJobTitle(e.target.value)}
               placeholder="Enter job title"
               className="w-full"
             />
           </div>

           {/* Job Description */}
           <div>
             <label className="block text-sm font-medium text-foreground mb-2">
               Job Description
             </label>
             <Textarea
               value={jobDesc}
               onChange={(e) => setJobDesc(e.target.value)}
               placeholder="Paste job description here..."
               className="min-h-[200px]"
             />
           </div>

           {/* Resume Upload */}
           <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
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
           </div>

           {/* Progress Bar */}
           {progress > 0 && (
             <Progress value={progress} className="w-full" />
           )}

           {/* Analyze Button */}
           <Button 
             className="w-full"
             disabled={!jobTitle || !jobDesc || files.length === 0}
           >
             Analyze Resumes
           </Button>
         </div>
       </Card>
     </div>
   </div>
 );
};

export default Dashboard;