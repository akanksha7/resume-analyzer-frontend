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
} from 'recharts';
import { 
  CheckCircle2,
  XCircle,
  FileText,
  FolderKanban,
  ScrollText,
  BarChart2,
  Clock
} from 'lucide-react';

const UsageDashboard = () => {
  // Sample data based on the API response
  const stats = {
    "recent_activities": {
      "recent_analyses": [],
      "recent_uploads": [
        {
          "catalog_id": "237b9633-07e0-4876-993d-dcf41ad2a774",
          "created_at": "2025-01-07T02:11:24",
          "filename": "Resume-Sample-1-Software-Engineer.pdf",
          "id": "4a0ec28e-abd6-4c07-b0ab-e6a87215a1b0"
        }
      ]
    },
    "stats_by_catalog": [
      {
        "analyses": 0,
        "catalog_id": "237b9633-07e0-4876-993d-dcf41ad2a774",
        "catalog_name": "Senior Software Engineer Jobs",
        "job_descriptions": 1,
        "resumes": 1
      }
    ],
    "total_resume_analyses": 10,
    "total_catalogs": 1,
    "total_job_descriptions": 1,
    "total_resumes": 1
  };

  const plan = {
    "plan_type": "Starter",
    "plan_id": "d4b1a347-0f7d-4c82-b86f-0304dc9bf8f4",
    "description": "Perfect for individual recruiters and small agencies",
    "price": 50000,
    "perResumeAnalysis": 100,
    "features": [
      { "name": "Advanced Bulk Analyzer", "included": true },
      { "name": "20 Interview Questions based on Candidates Resume", "included": false },
      { "name": "Quick Analyzer Per Resume", "included": false },
      { "name": "Recruiter Tagging", "included": true }
    ],
    "hidden-features": [
      { "name": "5 Catalogs", "included": true },
      { "name": "5 Job Descriptions per Catalog", "included": true },
      { "name": "500 Resume Uploads", "included": true }
    ],
    "max_resumes": 500,
    "max_catalogs": 5,
    "max_job_descriptions_per_catalog": 5
  };

  const COLORS = ['#4f46e5', '#e11d48', '#0891b2', '#d97706'];

  // Calculate usage percentages
  const usageData = [
    {
      name: 'Resume Uploads',
      used: stats.total_resumes,
      max: plan.max_resumes,
      percentage: (stats.total_resumes / plan.max_resumes) * 100,
      icon: <FileText className="w-4 h-4" />
    },
    {
      name: 'Catalogs',
      used: stats.total_catalogs,
      max: plan.max_catalogs,
      percentage: (stats.total_catalogs / plan.max_catalogs) * 100,
      icon: <FolderKanban className="w-4 h-4" />
    },
    {
      name: 'Job Descriptions',
      used: stats.total_job_descriptions,
      max: plan.max_job_descriptions_per_catalog * plan.max_catalogs,
      percentage: (stats.total_job_descriptions / (plan.max_job_descriptions_per_catalog * plan.max_catalogs)) * 100,
      icon: <ScrollText className="w-4 h-4" />
    },
    {
      name: 'Resume Analyses',
      used: stats.total_resume_analyses,
      max: plan.perResumeAnalysis,
      percentage: (stats.total_resume_analyses / plan.perResumeAnalysis) * 100,
      icon: <BarChart2 className="w-4 h-4" />
    }
  ];

  // Prepare data for pie chart
  const pieData = [
    { name: 'Resume Uploads', value: stats.total_resumes },
    { name: 'Resume Analyses', value: stats.total_resume_analyses },
    { name: 'Job Descriptions', value: stats.total_job_descriptions },
    { name: 'Catalogs', value: stats.total_catalogs }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{plan.plan_type} Plan</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </div>
            <Badge variant="outline" className="text-lg">
              ${(plan.price / 1000).toFixed(2)}
            </Badge>
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.used} / {item.max}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
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
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Available Features */}
            <div>
              <h3 className="text-lg font-medium mb-4">Available Features</h3>
              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className={`text-sm ${!feature.included && 'text-gray-400'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {stats.recent_activities.recent_uploads.map((upload, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium">{upload.filename}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(upload.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {stats.recent_activities.recent_uploads.length === 0 && (
                  <p className="text-sm text-gray-500">No recent activity</p>
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