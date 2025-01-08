import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from 'date-fns';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Printer,
  Share2,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MetadataBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tooltipText?: string;
}

const MetadataBadge: React.FC<MetadataBadgeProps> = ({ icon, label, value, tooltipText }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          {icon}
          <span className="font-medium">{label}:</span>
          <span>{value}</span>
        </div>
      </TooltipTrigger>
      {tooltipText && <TooltipContent>{tooltipText}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

const ResumeAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const data = location.state?.resumeAnalysis;

  if (!data) {
    return (
      <div className="p-6 text-center">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">No Analysis Data Available</p>
              <p className="text-sm text-muted-foreground mb-4">
                The analysis data could not be loaded. Please try again from the dashboard.
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Resume Analysis - ${data.analysis_result.executive_summary.candidate_name}`,
        text: `Analysis for ${data.analysis_result.executive_summary.position_applied}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleViewResume = () => {
    window.open(data.s3_url, '_blank');
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'bg-green-500';
    if (score >= 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationBadge = (recommendation: string) => {
    const isRecommended = recommendation?.toLowerCase().includes('recommend');
    return (
      <Badge className={isRecommended ? "bg-green-500" : "bg-red-500"}>
        <CheckCircle2 className="w-4 h-4 mr-1" />
        {recommendation}
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

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-[200px] w-full mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleViewResume}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Resume
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open original resume</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Print analysis report</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share analysis report</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Metadata Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetadataBadge
                icon={<FileText className="h-4 w-4" />}
                label="File"
                value={data.resume_filename}
                tooltipText="Original resume filename"
              />
              <MetadataBadge
                icon={<Calendar className="h-4 w-4" />}
                label="Analyzed on"
                value={format(new Date(data.created_at), 'MMM dd, yyyy')}
                tooltipText="Analysis date"
              />
              <MetadataBadge
                icon={<Clock className="h-4 w-4" />}
                label="Time"
                value={format(new Date(data.created_at), 'HH:mm a')}
                tooltipText="Analysis time"
              />
              <MetadataBadge
                icon={<Target className="h-4 w-4" />}
                label="Score"
                value={`${data.score}%`}
                tooltipText="Overall match score"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
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
                      <CardTitle className="text-2xl">{data.analysis_result.executive_summary.candidate_name}</CardTitle>
                      <CardDescription>{data.analysis_result.executive_summary.position_applied}</CardDescription>
                    </div>
                    {getRecommendationBadge(data.analysis_result.executive_summary.recommendation)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium mb-2">Overall Score</p>
                      <Progress 
                        value={data.score} 
                        className="h-2"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {data.score}/100
                      </p>
                    </div>

                    {/* Strengths and Gaps */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Key Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {data.analysis_result.executive_summary.key_strengths.map((strength: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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
                          {data.analysis_result.executive_summary.critical_gaps.length > 0 ? (
                            <ul className="space-y-2">
                              {data.analysis_result.executive_summary.critical_gaps.map((gap: string, index: number) => (
                                <li key={index} className="flex items-center">
                                  <AlertCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{gap}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No critical gaps identified</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Detailed Scoring */}
                    <Accordion type="single" collapsible className="mt-6">
                      <AccordionItem value="detailed-scoring">
                        <AccordionTrigger>Detailed Scoring</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6">
                            {Object.entries(data.analysis_result.detailed_scoring).map(([key, value]: [string, any]) => (
                              <Card key={key} className="p-4">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium capitalize">
                                      {key.replace(/_/g, ' ')}
                                    </h4>
                                    <span className={`text-sm font-medium ${getScoreTextColor(value.score)}`}>
                                      Score: {value.score}/5
                                    </span>
                                  </div>
                                  
                                  <Progress 
                                    value={value.score * 20} 
                                    className={`h-2 ${getScoreColor(value.score)}`}
                                  />
                                  
                                  <p className="text-sm text-gray-600">{value.analysis}</p>
                                  
                                  {value.positives.length > 0 && (
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium text-green-600">Positives:</p>
                                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {value.positives.map((positive: string, index: number) => (
                                          <li key={index}>{positive}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  {value.negatives.length > 0 && (
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium text-red-600">Areas for Improvement:</p>
                                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {value.negatives.map((negative: string, index: number) => (
                                          <li key={index}>{negative}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </Card>
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
                      {getRecommendationBadge(data.analysis_result.final_evaluation.recommendation)}
                      {getRiskLevelBadge(data.analysis_result.final_evaluation.risk_level)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Alert>
                      <AlertTitle>Evaluation Justification</AlertTitle>
                      <AlertDescription>
                        {data.analysis_result.final_evaluation.justification}
                      </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Experience Alignment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Progress 
                              value={data.analysis_result.final_evaluation.experience_alignment * 10} 
                              className="h-2"
                            />
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Score</span>
                              <span className="font-medium">
                                {data.analysis_result.final_evaluation.experience_alignment}/10
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Technical Alignment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Progress 
                              value={data.analysis_result.final_evaluation.technical_alignment * 10} 
                              className="h-2"
                            />
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Score</span>
                              <span className="font-medium">
                                {data.analysis_result.final_evaluation.technical_alignment}/10
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          Growth Potential Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {data.analysis_result.final_evaluation.growth_potential}
                        </p>
                      </CardContent>
                    </Card>
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
                    {data.analysis_result.interview_questions.map((question: any, index: number) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="space-y-2">
                            <Badge className="mb-2 w-fit">{question.category}</Badge>
                            <CardTitle className="text-lg leading-tight">{question.question}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-medium mb-3">Question Context</h4>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium w-1/3">Assessment Focus</TableCell>
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
                              <h4 className="text-sm font-medium mb-3">Response Assessment Guide</h4>
                              <div className="space-y-4">
                                <div className="p-3 bg-green-50 rounded-lg">
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                                    <div>
                                      <p className="font-medium text-green-700">Excellent Response</p>
                                      <p className="text-sm text-green-600 mt-1">{question.scoring_guidance.excellent_response}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-3 bg-yellow-50 rounded-lg">
                                  <div className="flex items-start">
                                    <Target className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                                    <div>
                                      <p className="font-medium text-yellow-700">Acceptable Response</p>
                                      <p className="text-sm text-yellow-600 mt-1">{question.scoring_guidance.acceptable_response}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-3 bg-red-50 rounded-lg">
                                  <div className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                                    <div>
                                      <p className="font-medium text-red-700">Concerning Response</p>
                                      <p className="text-sm text-red-600 mt-1">{question.scoring_guidance.concerning_response}</p>
                                    </div>
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
      </div>
    </div>
  );
};

export default ResumeAnalysis;