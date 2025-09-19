import { MetricCard } from "@/components/MetricCard";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";

// Mock data for reports
const reportSummary = {
  totalReports: 47,
  thisMonth: 12,
  accuracy: 94.2,
  flaggedContent: 1247
};

const recentReports = [
  {
    id: 1,
    title: "Weekly Misinformation Analysis Report",
    period: "Jan 8-14, 2024",
    type: "Weekly Summary",
    status: "completed",
    downloadUrl: "#",
    generatedAt: "2024-01-15T09:00:00Z",
    metrics: {
      flagged: 156,
      accuracy: 95.2,
      falsePositives: 3
    }
  },
  {
    id: 2,
    title: "Monthly Detection Performance Review",
    period: "December 2023",
    type: "Monthly Report",
    status: "completed",
    downloadUrl: "#",
    generatedAt: "2024-01-01T08:30:00Z",
    metrics: {
      flagged: 2451,
      accuracy: 94.8,
      falsePositives: 12
    }
  },
  {
    id: 3,
    title: "Custom Analysis: Social Media Trends",
    period: "Jan 1-10, 2024",
    type: "Custom Report",
    status: "generating",
    downloadUrl: null,
    generatedAt: null,
    metrics: {
      flagged: 89,
      accuracy: 93.1,
      falsePositives: 5
    }
  },
  {
    id: 4,
    title: "Quarterly Security Assessment",
    period: "Q4 2023",
    type: "Quarterly Report",
    status: "completed",
    downloadUrl: "#",
    generatedAt: "2023-12-28T14:15:00Z",
    metrics: {
      flagged: 7832,
      accuracy: 94.5,
      falsePositives: 45
    }
  }
];

export default function Reports() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-verdict-true";
      case "generating":
        return "text-verdict-doubtful";
      case "failed":
        return "text-verdict-false";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "generating":
        return Clock;
      case "failed":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Generate and download comprehensive analysis reports
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter Reports
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Reports"
          value={reportSummary.totalReports}
          change="All time generated"
          changeType="neutral"
          icon={FileText}
          description="Reports created"
        />
        
        <MetricCard
          title="This Month"
          value={reportSummary.thisMonth}
          change="+3 from last month"
          changeType="positive"
          icon={TrendingUp}
          description="Reports generated"
        />
        
        <MetricCard
          title="Avg Accuracy"
          value={`${reportSummary.accuracy}%`}
          change="+1.2% improvement"
          changeType="positive"
          icon={CheckCircle}
          description="Across all reports"
        />
        
        <MetricCard
          title="Content Analyzed"
          value={reportSummary.flaggedContent.toLocaleString()}
          change="Cumulative total"
          changeType="neutral"
          icon={AlertTriangle}
          description="Total flagged items"
        />
      </div>

      {/* Reports List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generated Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status);
              
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{report.title}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        {report.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{report.period}</span>
                      </div>
                      {report.generatedAt && (
                        <span>Generated: {formatDate(report.generatedAt)}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <span>
                        <strong>{report.metrics.flagged}</strong> items flagged
                      </span>
                      <span>
                        <strong>{report.metrics.accuracy}%</strong> accuracy
                      </span>
                      <span>
                        <strong>{report.metrics.falsePositives}</strong> false positives
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1 text-sm ${getStatusColor(report.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="capitalize">{report.status}</span>
                    </div>
                    
                    {report.status === "completed" && report.downloadUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    
                    {report.status === "generating" && (
                      <Button variant="outline" size="sm" disabled>
                        <Clock className="w-4 h-4 mr-2" />
                        Processing...
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Weekly Summary",
                description: "Comprehensive weekly analysis report",
                icon: Calendar,
                timeframe: "Last 7 days"
              },
              {
                title: "Monthly Review",
                description: "Detailed monthly performance report",
                icon: TrendingUp,
                timeframe: "Last 30 days"
              },
              {
                title: "Custom Analysis",
                description: "Custom date range and filters",
                icon: Filter,
                timeframe: "User defined"
              }
            ].map((template, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <template.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground">{template.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {template.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Timeframe: {template.timeframe}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}