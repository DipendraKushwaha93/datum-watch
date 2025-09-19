import { MetricCard } from "@/components/MetricCard";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  Clock,
  ExternalLink
} from "lucide-react";

// Mock data - in a real app, this would come from your API
const mockMetrics = {
  totalFlagged: 1247,
  todaysFlagged: 23,
  accuracy: 94.2,
  trendsChange: "+12%"
};

const mockRecentContent = [
  {
    id: 1,
    content: "Breaking: Major earthquake hits California, thousands evacuated...",
    verdict: "False" as const,
    reason: "No seismic activity detected by USGS",
    date: "2024-01-15",
    source: "social-media"
  },
  {
    id: 2,
    content: "New study shows coffee consumption linked to longevity...",
    verdict: "True" as const,
    reason: "Verified peer-reviewed research from Harvard Medical",
    date: "2024-01-15",
    source: "news-article"
  },
  {
    id: 3,
    content: "Government announces new tax policy affecting small businesses...",
    verdict: "Doubtful" as const,
    reason: "Partial information, requires fact verification",
    date: "2024-01-14",
    source: "blog-post"
  },
  {
    id: 4,
    content: "Celebrity announces retirement from entertainment industry...",
    verdict: "True" as const,
    reason: "Confirmed through official social media channels",
    date: "2024-01-14",
    source: "social-media"
  },
  {
    id: 5,
    content: "Miracle cure for diabetes discovered by local doctor...",
    verdict: "False" as const,
    reason: "No clinical trials or peer review evidence found",
    date: "2024-01-13",
    source: "blog-post"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor misinformation detection activities and key metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Flagged Content"
          value={mockMetrics.totalFlagged.toLocaleString()}
          change={`+${mockMetrics.todaysFlagged} today`}
          changeType="positive"
          icon={Shield}
          description="Content analyzed and flagged"
        />
        
        <MetricCard
          title="Detection Accuracy"
          value={`${mockMetrics.accuracy}%`}
          change="+2.1% from last week"
          changeType="positive"
          icon={TrendingUp}
          description="AI model accuracy rate"
        />
        
        <MetricCard
          title="Today's Analysis"
          value={mockMetrics.todaysFlagged}
          change="Real-time processing"
          changeType="neutral"
          icon={AlertTriangle}
          description="Content processed today"
        />
        
        <MetricCard
          title="Weekly Trends"
          value={mockMetrics.trendsChange}
          change="Increased detection rate"
          changeType="positive"
          icon={FileText}
          description="Compared to last week"
        />
      </div>

      {/* Recent Flagged Content */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Flagged Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentContent.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <VerdictBadge verdict={item.verdict} size="sm" />
                    <span className="text-xs text-muted-foreground">
                      {item.source}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                    {item.content}
                  </p>
                  
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Reason:</span> {item.reason}
                  </p>
                </div>
                
                <button className="flex-shrink-0 p-2 text-muted-foreground hover:text-primary transition-smooth">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
              View all flagged content →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}