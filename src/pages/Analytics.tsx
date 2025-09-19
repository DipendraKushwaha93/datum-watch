import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Target, 
  Activity, 
  Clock,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";

// Mock data for charts
const weeklyData = [
  { day: "Mon", flagged: 45, verified: 38, false: 32 },
  { day: "Tue", flagged: 52, verified: 44, false: 28 },
  { day: "Wed", flagged: 38, verified: 31, false: 35 },
  { day: "Thu", flagged: 61, verified: 52, false: 41 },
  { day: "Fri", flagged: 55, verified: 47, false: 38 },
  { day: "Sat", flagged: 43, verified: 35, false: 29 },
  { day: "Sun", flagged: 39, verified: 33, false: 31 }
];

const verdictDistribution = [
  { name: "True", value: 45, color: "hsl(var(--verdict-true))" },
  { name: "False", value: 35, color: "hsl(var(--verdict-false))" },
  { name: "Doubtful", value: 20, color: "hsl(var(--verdict-doubtful))" }
];

const monthlyTrends = [
  { month: "Sep", accuracy: 91, processed: 1240 },
  { month: "Oct", accuracy: 93, processed: 1580 },
  { month: "Nov", accuracy: 94, processed: 1820 },
  { month: "Dec", accuracy: 95, processed: 2100 },
  { month: "Jan", accuracy: 94, processed: 2450 }
];

const sourceBreakdown = [
  { source: "Social Media", count: 156, percentage: 62 },
  { source: "News Articles", count: 48, percentage: 19 },
  { source: "Blog Posts", count: 32, percentage: 13 },
  { source: "Forums", count: 15, percentage: 6 }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analysis of misinformation detection performance and trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Weekly Accuracy"
          value="94.2%"
          change="+1.5% from last week"
          changeType="positive"
          icon={Target}
          description="Detection accuracy rate"
        />
        
        <MetricCard
          title="Content Processed"
          value="2,451"
          change="+16.8% increase"
          changeType="positive"
          icon={Activity}
          description="This month"
        />
        
        <MetricCard
          title="Avg Response Time"
          value="1.2s"
          change="-0.3s improvement"
          changeType="positive"
          icon={Clock}
          description="Analysis processing time"
        />
        
        <MetricCard
          title="False Positive Rate"
          value="2.1%"
          change="-0.5% improvement"
          changeType="positive"
          icon={TrendingUp}
          description="Incorrectly flagged content"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="flagged" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="verified" fill="hsl(var(--verdict-true))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verdict Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Verdict Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verdictDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {verdictDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="accuracy"
                  orientation="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="processed"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Area
                  yAxisId="processed"
                  type="monotone"
                  dataKey="processed"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.1)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="accuracy"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(var(--verdict-true))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--verdict-true))", r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Source Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Content Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sourceBreakdown.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium">{source.source}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12">
                    {source.percentage}%
                  </span>
                  <span className="text-sm font-medium w-12">
                    {source.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}