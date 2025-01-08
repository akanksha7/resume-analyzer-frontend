// pages/ResumeAnalysisPage.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react';

const ResumeAnalysis = ({ data }) => {
  // Sample data
  // const data = {
  //   "analysis": {
  //     "detailed_scoring": {
  //       "experience_match": {
  //         "analysis": "Candidate has 6 months of internship experience but does not meet the 5+ years required for the position.",
  //         "score": 1
  //       },
  //       "job_sector_match": {
  //         "analysis": "Candidate has a relevant educational background and internship experience in web development, aligning with the job sector.",
  //         "score": 2
  //       },
  //       "longevity_score": {
  //         "analysis": "Candidate is a recent graduate with no long-term work experience, which is a gap for the role.",
  //         "score": 1
  //       },
  //       "primary_skill_match": {
  //         "analysis": "Candidate demonstrates proficiency in JavaScript, HTML/CSS, and Python but lacks experience with Flask, a key requirement.",
  //         "score": 1.5
  //       }
  //     },
  //     "executive_summary": {
  //       "candidate_name": "Bella Trevino",
  //       "critical_gaps": [
  //         "Lack of required 5+ years experience in Python/Flask",
  //         "Limited exposure to Flask specifically",
  //         "Need for more extensive work experience"
  //       ],
  //       "key_strengths": [
  //         "Strong academic background with a GPA of 3.9",
  //         "Experience in full-stack development",
  //         "Successful project management and collaboration"
  //       ],
  //       "overall_score": 5.5,
  //       "position_applied": "Web Developer",
  //       "recommendation": "Not Recommended"
  //     },
  //     "final_evaluation": {
  //       "experience_alignment": 3.0,
  //       "growth_potential": "Moderate",
  //       "justification": "Candidate does not meet the experience requirements and lacks specific skills in Flask, which are critical for the role.",
  //       "recommendation": "Not Recommended",
  //       "risk_level": "High",
  //       "technical_alignment": 5.0
  //     },
  //     "interview_questions": [
  //       {
  //         "category": "Technical Depth",
  //         "question": "Based on your Social Media Scheduler project, how would you redesign that system to meet our requirement for scalability using Flask?",
  //         "context": {
  //           "assessment_focus": "Technical depth in Flask and system design",
  //           "candidate_experience": "Built a responsive app with Django and Node",
  //           "jd_requirement": "Experience in Flask and scalable applications"
  //         },
  //         "scoring_guidance": {
  //           "excellent_response": "Demonstrates clear understanding of Flask, scalability solutions, and applies knowledge to the project.",
  //           "acceptable_response": "Shows some knowledge of Flask but lacks depth in scalability.",
  //           "concerning_response": "Unfamiliar with Flask and provides vague responses."
  //         }
  //       }
  //     ]
  //   }
  // };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'bg-green-500';
    if (score >= 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRecommendationBadge = (recommendation: string) => {
    if (recommendation === "Recommended") {
      return (
        <Badge className="bg-green-500">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Recommended
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-500">
        <XCircle className="w-4 h-4 mr-1" />
        Not Recommended
      </Badge>
    );
  };

  const getRiskLevelBadge = (riskLevel: string) => {
    const colors = {
      'Low': 'bg-green-500',
      'Medium': 'bg-yellow-500',
      'High': 'bg-red-500'
    };
    return (
      <Badge className={colors[riskLevel as keyof typeof colors]}>
        <Shield className="w-4 h-4 mr-1" />
        {riskLevel} Risk
      </Badge>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList>
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="evaluation">Final Evaluation</TabsTrigger>
          <TabsTrigger value="questions">Interview Questions</TabsTrigger>
        </TabsList>

        {/* Executive Summary Tab */}
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{data.analysis.executive_summary.candidate_name}</CardTitle>
                  <CardDescription>{data.analysis.executive_summary.position_applied}</CardDescription>
                </div>
                {getRecommendationBadge(data.analysis.executive_summary.recommendation)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Overall Score</p>
                  <Progress 
                    value={data.analysis.executive_summary.overall_score * 10} 
                    className="h-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {data.analysis.executive_summary.overall_score}/10
                  </p>
                </div>

                {/* Strengths and Gaps */}
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {data.analysis.executive_summary.key_strengths.map((strength, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Critical Gaps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {data.analysis.executive_summary.critical_gaps.map((gap, index) => (
                          <li key={index} className="flex items-center">
                            <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span className="text-sm">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Scoring */}
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="detailed-scoring">
                    <AccordionTrigger>Detailed Scoring</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {Object.entries(data.analysis.detailed_scoring).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium capitalize">
                                {key.replace(/_/g, ' ')}
                              </h4>
                              <span className="text-sm text-gray-500">
                                Score: {value.score}/5
                              </span>
                            </div>
                            <Progress 
                              value={value.score * 20} 
                              className={`h-2 ${getScoreColor(value.score)}`}
                            />
                            <p className="text-sm text-gray-600 mt-1">{value.analysis}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Final Evaluation Tab */}
        <TabsContent value="evaluation">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Final Evaluation</CardTitle>
                <div className="flex space-x-2">
                  {getRecommendationBadge(data.analysis.final_evaluation.recommendation)}
                  {getRiskLevelBadge(data.analysis.final_evaluation.risk_level)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <AlertTitle>Evaluation Justification</AlertTitle>
                  <AlertDescription>
                    {data.analysis.final_evaluation.justification}
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Experience Alignment</h4>
                    <Progress 
                      value={data.analysis.final_evaluation.experience_alignment * 20} 
                      className="h-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {data.analysis.final_evaluation.experience_alignment}/5
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Technical Alignment</h4>
                    <Progress 
                      value={data.analysis.final_evaluation.technical_alignment * 20} 
                      className="h-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {data.analysis.final_evaluation.technical_alignment}/5
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Growth Potential
                  </h4>
                  <p className="text-sm text-gray-600">
                    {data.analysis.final_evaluation.growth_potential}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interview Questions Tab */}
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Interview Questions</CardTitle>
              <CardDescription>
                Questions tailored based on candidate profile and job requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.analysis.interview_questions.map((question, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className="mb-2">{question.category}</Badge>
                          <CardTitle className="text-lg">{question.question}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Context</h4>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Assessment Focus</TableCell>
                                <TableCell>{question.context.assessment_focus}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Candidate Experience</TableCell>
                                <TableCell>{question.context.candidate_experience}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Job Requirement</TableCell>
                                <TableCell>{question.context.jd_requirement}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Scoring Guidance</h4>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-1" />
                              <div>
                                <p className="font-medium">Excellent Response</p>
                                <p className="text-sm text-gray-600">{question.scoring_guidance.excellent_response}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Target className="w-4 h-4 text-yellow-500 mr-2 mt-1" />
                              <div>
                                <p className="font-medium">Acceptable Response</p>
                                <p className="text-sm text-gray-600">{question.scoring_guidance.acceptable_response}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                              <div>
                                <p className="font-medium">Concerning Response</p>
                                <p className="text-sm text-gray-600">{question.scoring_guidance.concerning_response}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeAnalysis;