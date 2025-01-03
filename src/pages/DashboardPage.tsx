// pages/DashboardPage.tsx
import { useState } from 'react';
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { api } from "@/services/api"

// Types
interface ResumeUploadResult {
  filename: string;
  status: string;
}

interface JobDescription {
  id: string;
  title: string;
  description: string;
  catalog_id: string;
  created_at: string;
}

interface ActiveJob {
  id: string;
  title: string;
  catalog_id: string;
  catalogName: string;
  description: string;
}

interface SelectedCatalog {
  id: string;
  name: string;
}

enum DashboardView {
  CREATE_JOB,
  UPLOAD_RESUMES
}

const Dashboard = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedResumes, setUploadedResumes] = useState<ResumeUploadResult[]>([]);
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<SelectedCatalog | null>(null);
  const [view, setView] = useState<DashboardView>(DashboardView.UPLOAD_RESUMES);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    catalogId: '',
    catalogName: ''
  });

  // Function to handle file uploads
  const handleFileUpload = async (files: FileList) => {
    if (!activeJob) return;

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const result = await api.uploadResumes(activeJob.catalog_id, files);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedResumes(prev => [...prev, ...result.results]);

      setTimeout(() => {
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error('Failed to upload resumes:', error);
      setUploadProgress(0);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const job = await api.createJobDescription(
        jobForm.catalogId,
        jobForm.title,
        jobForm.description
      );
      
      // Reset form and switch to upload view
      setJobForm({ title: '', description: '', catalogId: '', catalogName: '' });
      setActiveJob({
        id: job.id,
        title: job.title,
        catalog_id: job.catalog_id,
        catalogName: selectedCatalog?.name || '',
        description: job.description
      });
      setView(DashboardView.UPLOAD_RESUMES);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const handleCatalogDelete = (catalogId: string) => {
    if (selectedCatalog?.id === catalogId) {
      setSelectedCatalog(null);
      setActiveJob(null);
      setUploadedResumes([]);
      setView(DashboardView.UPLOAD_RESUMES);
    }
  };

  const renderBreadcrumb = () => {
    if (!selectedCatalog && !activeJob && view !== DashboardView.CREATE_JOB) {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    return (
      <BreadcrumbList>
        {selectedCatalog && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" onClick={(e) => {
                e.preventDefault();
                setActiveJob(null);
                setView(DashboardView.UPLOAD_RESUMES);
              }}>
                {selectedCatalog.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {(activeJob || view === DashboardView.CREATE_JOB) && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {view === DashboardView.CREATE_JOB 
                      ? 'New Job Description' 
                      : activeJob?.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    );
  };

  const renderContent = () => {
    if (view === DashboardView.CREATE_JOB) {
      return (
        <Card className="max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Job Description</h2>
          <form onSubmit={handleCreateJob} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Title</label>
              <Input
                value={jobForm.title}
                onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter job title"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Job Description</label>
              <Textarea
                value={jobForm.description}
                onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter job description"
                className="min-h-[200px]"
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create Job
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setView(DashboardView.UPLOAD_RESUMES);
                  setJobForm({ title: '', description: '', catalogId: '', catalogName: '' });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      );
    }

    if (!activeJob) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {selectedCatalog 
            ? "Select a job or create a new one" 
            : "Select a catalog to get started"}
        </div>
      );
    }

    return (
      <Card className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">{activeJob.title}</h2>
              <p className="text-muted-foreground mt-1">Upload resumes for screening</p>
            </div>
          </div>

          <p className="text-muted-foreground mt-1">{activeJob.description}</p>

          {/* Resume Upload Section */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files);
                }
              }}
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="resume-upload"
            />
            <label 
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <UploadCloud className="h-12 w-12 text-primary mb-4" />
              <span className="text-muted-foreground">
                Upload Resumes (PDF, DOC, DOCX)
              </span>
              {uploadedResumes.length > 0 && (
                <span className="text-sm text-primary mt-2">
                  {uploadedResumes.length} files uploaded
                </span>
              )}
            </label>
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Uploaded Resumes Table */}
          {uploadedResumes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Uploaded Resumes</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedResumes.map((resume, index) => (
                    <TableRow key={index}>
                      <TableCell>{resume.filename}</TableCell>
                      <TableCell>
                        <span className={resume.status === 'success' 
                          ? 'text-green-600' 
                          : 'text-red-600'}>
                          {resume.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarProvider>
        <AppSidebar 
          onJobSelect={(job) => {
            setActiveJob({
              id: job.id,
              title: job.title,
              catalog_id: job.catalog_id,
              catalogName: job.catalogName,
              description: job.description
            });
            setSelectedCatalog({
              id: job.catalog_id,
              name: job.catalogName
            });
            setUploadedResumes([]);
            setView(DashboardView.UPLOAD_RESUMES);
          }}
          onCreateJob={(catalogId, catalogName) => {
            setJobForm(prev => ({ ...prev, catalogId, catalogName }));
            setSelectedCatalog({
              id: catalogId,
              name: catalogName
            });
            setView(DashboardView.CREATE_JOB);
          }}
          onCatalogSelect={(catalog) => {
            setSelectedCatalog({
              id: catalog.id,
              name: catalog.name
            });
            setActiveJob(null);
            setUploadedResumes([]);
          }}
          onCatalogDelete={handleCatalogDelete}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              {renderBreadcrumb()}
            </Breadcrumb>
          </header>

          <div className="flex-1 p-8">
            {renderContent()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;