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

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: { name: string; included: boolean; }[];
  popular?: boolean;
}
