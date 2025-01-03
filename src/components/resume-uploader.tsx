import { api } from "@/services/api";
import { Input } from "./ui/input";
import { UploadCloud } from "lucide-react";

export function ResumeUploader({ 
    catalogId,
    onUploadComplete 
  }: { 
    catalogId: string;
    onUploadComplete: (results: ResumeUploadResult[]) => void;
  }) {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        try {
          const result = await api.uploadResumes(catalogId, e.target.files);
          onUploadComplete(result.results);
        } catch (error) {
          console.error('Failed to upload resumes:', error);
        }
      }
    };
  
    return (
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
        <Input
          type="file"
          onChange={handleFileChange}
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
          <span className="text-foreground-muted">
            Upload Resumes (PDF, DOC, DOCX)
          </span>
        </label>
      </div>
    );
  }