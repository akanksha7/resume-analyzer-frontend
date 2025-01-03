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
  filename: string;
  status: string;
}

export interface ActiveJob {
  id: string;
  title: string;
  catalog_id: string;
  catalogName: string;
}