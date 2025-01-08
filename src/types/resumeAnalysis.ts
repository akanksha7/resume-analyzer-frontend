// types/resume.ts

interface ResumeResponse {
  items: ResumeItem[];
  meta: {
    has_next: boolean;
    has_prev: boolean;
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
}

interface ResumeItem {
  analysis: ResumeAnalysis | null;
  created_at: string;
  filename: string;
  id: string;
}

interface ResumeAnalysis {
  analysis_result: AnalysisResult;
  created_at: string;
  score: number;
}

interface AnalysisResult {
  detailed_scoring: DetailedScoring;
  executive_summary: ExecutiveSummary;
  experience_assessment: ExperienceAssessment;
  final_evaluation: FinalEvaluation;
  interview_questions: InterviewQuestion[];
}

interface DetailedScoring {
  experience_match: ScoringCategory;
  job_sector_match: ScoringCategory;
  longevity_score: ScoringCategory;
  primary_skill_match: ScoringCategory;
}

interface ScoringCategory {
  analysis: string;
  negatives: string[];
  positives: string[];
  score: number;
}

interface ExecutiveSummary {
  candidate_name: string;
  critical_gaps: string[];
  key_strengths: string[];
  overall_score: number;
  position_applied: string;
  recommendation: string;
}

interface ExperienceAssessment {
  adjustments: {
    over_qualification: {
      beneficial_factors: string[];
      score_impact: number;
      years_excess: number;
    };
    quality_factors: {
      domain_depth: number;
      progression_score: number;
      relevance_score: number;
      technology_currency: number;
    };
    under_qualification: {
      mitigating_factors: string[];
      score_impact: number;
      years_gap: number;
    };
  };
  base_score: number;
  risk_assessment: {
    identified_risks: string[];
    mitigation_strategies: string[];
    overall_risk_level: string;
  };
}

interface FinalEvaluation {
  experience_alignment: number;
  growth_potential: string;
  justification: string;
  recommendation: string;
  risk_level: string;
  technical_alignment: number;
}

interface InterviewQuestion {
  assessment_criteria: {
    good_to_have_keywords: string[];
    must_have_keywords: string[];
    red_flags: string[];
    scoring_weight: {
      good_to_have: number;
      must_have: number;
    };
  };
  category: string;
  context: {
    assessment_focus: string;
    candidate_experience: string;
    jd_requirement: string;
  };
  question: string;
  scoring_guidance: {
    acceptable_response: string;
    concerning_response: string;
    excellent_response: string;
  };
}

export type {
  ResumeResponse,
  ResumeItem,
  ResumeAnalysis,
  AnalysisResult,
  DetailedScoring,
  ScoringCategory,
  ExecutiveSummary,
  ExperienceAssessment,
  FinalEvaluation,
  InterviewQuestion
};