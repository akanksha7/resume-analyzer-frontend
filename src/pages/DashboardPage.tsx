// pages/DashboardPage.tsx
import { useMemo, useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Pencil, Trash2, UploadCloud } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { api } from "@/services/api"
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useToast } from "@/components/hooks/use-toast";
import CollapsibleDescription from '@/components/ui/collapsible-description';
import { Checkbox } from "@/components/ui/checkbox";
import { Play, FileText } from "lucide-react";
import { describe } from 'node:test';
import { ResumeDataTable } from '@/components/dashboard/data-table';
import { columns } from '@/components/dashboard/columns';

interface ResumeUploadResult {
  id: string;
  filename: string;
  analysisStatus: 'queued' | 'completed';
  matchScore: number;
}

interface ActiveJob {
  id: string;
  title: string;
  catalog_id: string;
  catalogName: string;
  description: string;
}

interface DashboardProps {
  onJobUpdate?: (job: ActiveJob) => void;
  onJobDelete?: (catalogId: string, jobId: string) => void;
}

interface SelectedCatalog {
  id: string;
  name: string;
}

enum DashboardView {
  CREATE_JOB,
  UPLOAD_RESUMES
}

interface ResumeAnalysis {
  id: string;
  match_score: number;
  created_at: string;
}

interface Resume {
  id: string;
  filename: string;
  analysis?: ResumeAnalysis;
  analysisStatus: 'queued' | 'completed';
  matchScore: number;
}

const Dashboard = ({ onJobDelete, onJobUpdate }: DashboardProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedResumes, setUploadedResumes] = useState<ResumeUploadResult[]>([]);
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<SelectedCatalog | null>(null);
  const [view, setView] = useState<DashboardView>(DashboardView.UPLOAD_RESUMES);
  const [isUploading, setIsUploading] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    catalogId: '',
    catalogName: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);
  const isAllSelected = useMemo(() => 
    uploadedResumes.length > 0 && selectedResumes.length === uploadedResumes.length,
    [uploadedResumes.length, selectedResumes.length]
  );


  const handleAnalyzeSelected = async () => {
    if (!activeJob?.id || selectedResumes.length === 0) return;
  
    try {
      await api.analyzeBatchResumes(activeJob.id, selectedResumes);
      
      // Update the status of selected resumes to 'queued'
      setUploadedResumes(prevResumes => 
        prevResumes.map(resume => ({
          ...resume,
          analysisStatus: selectedResumes.includes(resume.id) ? 'queued' : resume.analysisStatus,
          matchScore: selectedResumes.includes(resume.id) ? 0 : resume.matchScore
        }))
      );
      
      // Clear selection after starting analysis
      setSelectedResumes([]);
      
      toast({
        title: "Analysis Started",
        description: `Started analysis for ${selectedResumes.length} resume(s)`,
      });
    } catch (error) {
      console.error('Failed to start analysis:', error);
      toast({
        title: "Error",
        description: "Failed to start analysis. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewAnalysis = (resumeId: string) => {
    navigate(`/analysis/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: string) => {
    try {
      // Implement your delete logic here
      setUploadedResumes(prevResumes => 
        prevResumes.filter(resume => resume.id !== resumeId)
      );
      setSelectedResumes(prev => prev.filter(id => id !== resumeId));
      
      toast({
        title: "Resume Deleted",
        description: "Resume has been removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  // Function to handle file uploads
  const handleFileUpload = async (files: FileList) => {

    if (!activeJob || isUploading) return;

    try {
      setIsUploading(true);
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

      const newResumes: ResumeUploadResult[] = result.results.map((r: { id?: string; filename: string }) => ({
        id: r.id || crypto.randomUUID(),
        filename: r.filename,
        analysisStatus: 'queued',
        matchScore: 0
      }));

      setUploadedResumes(prev => [...prev, ...newResumes]);
      
      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${files.length} resume${files.length > 1 ? 's' : ''}`,
        variant: "default",
      
      });

      setTimeout(() => {
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error('Failed to upload resumes:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload resumes. Please try again.",
        variant: "destructive",
        // icon: <XCircle className="h-4 w-4" />
      });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
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
      
      setJobForm({ title: '', description: '', catalogId: '', catalogName: ''});
      setActiveJob({
        id: job.id,
        title: job.title,
        catalog_id: job.catalog_id,
        catalogName: selectedCatalog?.name || '',
        description: job.description
      });
      setView(DashboardView.UPLOAD_RESUMES);
      
      toast({
        title: "Success",
        description: "Job description created successfully",
        variant: "default",
        // icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
    } catch (error) {
      console.error('Failed to create job:', error);
      toast({
        title: "Error",
        description: "Failed to create job description",
        variant: "destructive",
        // icon: <XCircle className="h-4 w-4" />
      });
    }
  };

  const handleCatalogDelete = (catalogId: string) => {
    if (selectedCatalog?.id === catalogId) {
      setSelectedCatalog(null);
      setActiveJob(null);
      setUploadedResumes([]);
      setView(DashboardView.UPLOAD_RESUMES);
      
      toast({
        title: "Catalog Deleted",
        description: "Catalog has been removed successfully",
        variant: "default",
        // icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
    }
  };

// Updated handleDeleteJob function
const handleDeleteJob = async (catalogId: string, jobId: string) => {
  try {
    await api.deleteJob(catalogId, jobId);
    setActiveJob(null);
    setUploadedResumes([]);
    
    // Update sidebar data
    onJobDelete && onJobDelete(catalogId, jobId);
    
    toast({
      title: "Job Deleted",
      description: "Job has been removed successfully",
      variant: "default",
    });
  } catch (error) {
    console.error('Failed to delete job:', error);
    toast({
      title: "Error",
      description: "Failed to delete job",
      variant: "destructive",
    });
  }
};
  
 
  // const handleUpdateJob = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!activeJob) return;
  
  //   try {
  //     const job = await api.updateJob(
  //       activeJob.catalog_id,
  //       activeJob.id,
  //       {
  //         title: jobForm.title,
  //         description: jobForm.description
  //       }
  //     );
      
      // Update active job
      // const updatedJob = {
      //   id: job.id,
      //   title: job.title,
      //   catalog_id: job.catalog_id,
      //   catalogName: selectedCatalog?.name || '',
      //   description: job.description
      // };
      
      // setActiveJob(updatedJob);
      
      // Reset form
      // setJobForm({ 
      //   title: '', 
      //   description: '', 
      //   catalogId: '', 
      //   catalogName: ''
      // });
      
  //     setView(DashboardView.UPLOAD_RESUMES);
      
  //     // Update sidebar data
  //     // onJobUpdate && onJobUpdate(updatedJob);
      
  //     toast({
  //       title: "Success",
  //       description: "Job description updated successfully",
  //       variant: "default",
  //     });
  //   } catch (error) {
  //     console.error('Failed to update job:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to update job description",
  //       variant: "destructive",
  //     });
  //   }
  // };

  useEffect(() => {
    const fetchExistingResumes = async () => {
      if (!activeJob?.catalog_id) return;
      
      setIsLoadingResumes(true);
      try {
        // Fetch resumes with job_description_id for analysis
        const response = await api.getResumes(activeJob.catalog_id, activeJob.id);
        
        // Transform the data with analysis if it exists
        const resumesWithAnalysis = response.items.map((resume: any) => ({
          id: resume.id,
          filename: resume.filename,
          created_at: resume.created_at,
          analysisStatus: resume.analysis ? 'completed' : 'queued',
          matchScore: resume.analysis ? resume.analysis.score : 0
        }));
  
        setUploadedResumes(resumesWithAnalysis);
      } catch (error) {
        console.error('Failed to fetch resumes:', error);
        toast({
          title: "Error",
          description: "Failed to load existing resumes",
          variant: "destructive",
        });
      } finally {
        setIsLoadingResumes(false);
      }
    };
  
    fetchExistingResumes();
  }, [activeJob?.catalog_id, activeJob?.id]);


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
              <BreadcrumbLink 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveJob(null);
                  setView(DashboardView.UPLOAD_RESUMES);
                }}
              >
                {selectedCatalog.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {(activeJob || view === DashboardView.CREATE_JOB) && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {view === DashboardView.CREATE_JOB 
                      ? jobForm.title ? 'Update Job Description' : 'New Job Description'
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
          <h2 className="text-2xl font-semibold mb-6">
            'Create New Job Description' 
          </h2>
          <form onSubmit={(e) => {
              handleCreateJob(e);
          }} className="space-y-6">
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
                  'Create Job'
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
              <p className="text-muted-foreground mt-1">Job Description</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
              {/* <DropdownMenuItem 
                onClick={() => {
                  // Set form values with current job data
                  setJobForm({
                    title: activeJob.title,
                    description: activeJob.description,
                    catalogId: activeJob.catalog_id,
                    catalogName: activeJob.catalogName
                  });
                  setView(DashboardView.CREATE_JOB);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Update Description
              </DropdownMenuItem> */}
                <DropdownMenuItem 
                  onClick={() => handleDeleteJob(activeJob.catalog_id, activeJob.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* <p className="text-muted-foreground mt-1">{activeJob.description}</p> */}
          <CollapsibleDescription 
            description={activeJob.description}
            isUploadingActive={isUploading || uploadProgress > 0}
          />

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
              disabled={isUploading}
            />

            <label 
              htmlFor="resume-upload"
              className={cn(
                "cursor-pointer flex flex-col items-center",
                isUploading && "opacity-50 cursor-not-allowed"
              )}
            >
              
              <span className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                <UploadCloud className="h-5 w-5 text-primary" />
                Upload Resumes to Catalog
              </span>
              <span className="text-xs text-muted-foreground">
                Accepted Formats: PDF, DOC, DOCX
              </span>
              <Input
                type="file"
                className="hidden"
                id="resume-upload-input"
                onChange={(e) => {
                  const fileCount = e.target.files?.length || 0;
                  if (fileCount > 0) {
                    const filesText = `${fileCount} ${fileCount === 1 ? 'file' : 'files'} selected`;
                    const sibling = e.target.nextElementSibling as HTMLElement | null;
                    if (sibling) {
                      sibling.textContent = filesText;
                    }
                  }
                }}
              />
              <span className="text-xs text-primary mt-2">No files selected</span>
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

     
              {/* {uploadedResumes.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Uploaded Resumes
                      {isLoadingResumes && (
                        <span className="ml-2 text-muted-foreground text-sm font-normal">
                          Loading...
                        </span>
                      )}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAnalyzeSelected()}
                        disabled={selectedResumes.length === 0 || isLoadingResumes}
                        className="flex items-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Analyze Selected ({selectedResumes.length})
                      </Button>
                    </div>
                  </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={(checked) => {
                          setSelectedResumes(checked 
                            ? uploadedResumes.map(r => r.id)
                            : []
                          );
                        }}
                      />
                    </TableHead>
                    <TableHead>Resume Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedResumes.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedResumes.includes(resume.id)}
                          onCheckedChange={(checked) => {
                            setSelectedResumes(checked
                              ? [...selectedResumes, resume.id]
                              : selectedResumes.filter(id => id !== resume.id)
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>{resume.filename}</TableCell>
                      <TableCell>
                        {resume.analysisStatus === 'completed' ? (
                          <span className="text-green-600 font-medium">Analyzed</span>
                        ) : (
                          <span className="text-muted-foreground">Queued</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          resume.analysisStatus === 'completed' 
                            ? resume.matchScore >= 80 
                              ? "text-green-600" 
                              : "text-red-600"
                            : "text-muted-foreground"
                        )}>
                          {resume.analysisStatus === 'completed' ? `${resume.matchScore}%` : '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          {resume.analysisStatus === 'completed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/resume-analysis/${resume.id}`, {
                                state: { 
                                  jobId: activeJob?.id,
                                  catalogId: activeJob?.catalog_id,
                                  resumeId: resume.id
                                }
                              })}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View Analysis
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteResume(resume.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )} */}
          {uploadedResumes.length > 0 && (
            <div className="mt-6">
              <ResumeDataTable
                data={uploadedResumes}
                columns={columns}
                isLoading={isLoadingResumes}
                onAnalyzeSelected={handleAnalyzeSelected}
                selectedRows={selectedResumes}
                meta={{
                  onViewAnalysis: (resumeId: string) => navigate(`/resume-analysis/${resumeId}`, {
                    state: { 
                      jobId: activeJob?.id,
                      catalogId: activeJob?.catalog_id,
                      resumeId: resumeId
                    }
                  }),
                  onDeleteResume: handleDeleteResume
                }}
              />
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
          // onJobUpdate={handleUpdateJob}
          onJobDelete={handleDeleteJob}
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