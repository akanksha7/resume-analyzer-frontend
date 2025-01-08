import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';
import { 
  CheckCircle2,
  XCircle,
  FileText,
  FolderKanban,
  ScrollText,
  BarChart2,
  Clock,
  Loader2
} from 'lucide-react';
import { api } from '@/services/api';
import { cn } from '@/lib/utils';
import { usePlans } from '@/services/plasnContext';
import type { Stats } from '@/types/types';
import type { Feature } from '@/types/types';
import { useAuth } from '@/services/authContext';

const EmptyState = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: LucideIcon;
}) => (
  <div className="flex flex-col items-center justify-center py-8">
    <Icon className="w-10 h-10 text-muted-foreground/30 mb-3" />
    <p className="text-base font-medium text-muted-foreground">{title}</p>
    <p className="text-sm text-muted-foreground/70">{description}</p>
  </div>
);

const COLORS = ['#4f46e5', '#e11d48', '#0891b2', '#d97706'];

const UsageDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { plans, isLoading: isLoadingPlan } = usePlans();
  const { user } = useAuth();
  const navigate = useNavigate();
  const currentPlan = plans.find(plan => plan.plan_id === user?.plan_id) || null;
  debugger;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const response = await api.getStats();
        setStats(response);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load dashboard stats');
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoadingStats || isLoadingPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !stats || !user?.plan_id) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/dashboard')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-lg font-medium text-destructive">
              {error || 'Failed to load dashboard'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      </div>
      </div>
    );
  }

  const usageData = [
    {
      name: 'Resume Uploads',
      used: stats.total_resumes,
      max: currentPlan?.max_resumes ?? 0,
      percentage: currentPlan?.max_resumes ? (stats.total_resumes / currentPlan.max_resumes) * 100 : 0,
      icon: <FileText className="w-4 h-4" />
    },
    {
      name: 'Catalogs',
      used: stats.total_catalogs,
      max: currentPlan?.max_catalogs ?? 0,
      percentage: currentPlan?.max_catalogs ? (stats.total_catalogs / currentPlan.max_catalogs) * 100 : 0,
      icon: <FolderKanban className="w-4 h-4" />
    },
    {
      name: 'Job Descriptions',
      used: stats.total_job_descriptions,
      max: currentPlan?.max_job_descriptions_per_catalog 
        ? currentPlan.max_job_descriptions_per_catalog * (currentPlan.max_catalogs ?? 1)
        : 0,
      percentage: currentPlan?.max_job_descriptions_per_catalog && currentPlan?.max_catalogs
        ? (stats.total_job_descriptions / (currentPlan.max_job_descriptions_per_catalog * currentPlan.max_catalogs)) * 100
        : 0,
      icon: <ScrollText className="w-4 h-4" />
    },
    {
      name: 'Resume Analyses',
      used: stats.total_analyses,
      max: currentPlan?.perResumeAnalysis ?? 0,
      percentage: currentPlan?.perResumeAnalysis ? (stats.total_analyses / currentPlan.perResumeAnalysis) * 100 : 0,
      icon: <BarChart2 className="w-4 h-4" />
    }
  ];

  const pieData = [
    { name: 'Resume Uploads', value: stats.total_resumes },
    { name: 'Resume Analyses', value: stats.total_analyses },
    { name: 'Job Descriptions', value: stats.total_job_descriptions },
    { name: 'Catalogs', value: stats.total_catalogs }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
    {/* Back Button */}
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate('/dashboard')}
      className="mb-4"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Dashboard
    </Button>

      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{currentPlan?.plan_type} Plan</CardTitle>
              <CardDescription>{currentPlan?.description}</CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-lg mb-2">
              ₹{(currentPlan?.price  ?? 0/ 1000).toFixed(2)}
              </Badge>
              
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Usage Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Usage Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {usageData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-primary/10">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{item.name}</span>
                        <div className="text-xs text-muted-foreground">
                          {item.used === 0 ? 'No usage yet' : `${Math.round(item.percentage)}% used`}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {item.used} / {item.max}
                    </span>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className={cn(
                      "h-2",
                      item.percentage > 80 && "bg-destructive/20"
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.every(item => item.value === 0) ? (
              <EmptyState 
                icon={BarChart2}
                title="No data to display"
                description="Stats will appear as you use the platform"
              />
            ) : (
              <>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={15}
                      data={pieData}
                    >
                      <RadialBar
                        label={false}
                        background
                        dataKey="value"
                        fill="#4f46e5"
                      />
                      {/* <Legend
                        iconSize={10}
                        layout="horizontal"
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: '12px' }}
                      /> */}
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features & Activity */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Available Features */}
            <div>
              <h3 className="text-lg font-medium mb-4">Available Features</h3>
              <div className="space-y-4">
                {currentPlan?.features.map((feature: Feature, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={cn(
                      "text-sm",
                      !feature.included && "text-muted-foreground"
                    )}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                {stats.recent_activities.recent_uploads.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Last {stats.recent_activities.recent_uploads.length} activities
                  </Badge>
                )}
              </div>
              <div className="space-y-4">
                {stats.recent_activities.recent_uploads.length > 0 ? (
                  stats.recent_activities.recent_uploads.map((upload: any, index: any) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Clock className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" title={upload.filename}>
                          {upload.filename}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          }).format(new Date(upload.created_at))}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState 
                    icon={Clock}
                    title="No recent activity"
                    description="Your recent actions will appear here"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageDashboard;