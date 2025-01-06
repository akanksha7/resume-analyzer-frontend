export interface Catalog {
  id: string;
  name: string;
  description: string;
  created_at: string;
  items: JobDescription[];
}

export interface JobDescription {
  id: string;
  title: string;
  description: string;
  catalog_id: string;
  created_at: string;
  isActive?: boolean;
}

export interface ResumeUploadResult {
  id: string;
  filename: string;
  analysisStatus: 'queued' | 'completed';
  matchScore: number;
}

export interface ActiveJob {
  id: string;
  title: string;
  catalog_id: string;
  catalogName: string;
}

export interface Feature {
  name: string;
  included: boolean;
}

export interface Plan {
  plan_type: string;
  plan_id: string;
  description: string;
  price: number;
  perResumeAnalysis: number;
  features: Feature[];
  max_resumes: number;
  max_catalogs: number;
  max_job_descriptions_per_catalog: number;
}

export interface Resume {
  id: string;
  filename: string;
  created_at: string;
}
