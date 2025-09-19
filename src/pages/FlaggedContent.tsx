import { useState } from "react";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter,
  ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock data with more extensive content
const mockFlaggedContent = [
  {
    id: 1,
    content: "Breaking: Major earthquake hits California, thousands evacuated. Government confirms 8.5 magnitude quake struck at 3 AM local time.",
    verdict: "False" as const,
    reason: "No seismic activity detected by USGS monitoring systems. No evacuation orders issued by California Emergency Management.",
    date: "2024-01-15T10:30:00Z",
    source: "social-media",
    confidence: 98.5,
    platform: "Twitter"
  },
  {
    id: 2,
    content: "New Harvard study reveals coffee consumption of 3-4 cups daily linked to 15% reduced risk of cardiovascular disease and increased longevity.",
    verdict: "True" as const,
    reason: "Verified peer-reviewed research published in American Journal of Cardiology, findings consistent with multiple studies.",
    date: "2024-01-15T08:15:00Z",
    source: "news-article",
    confidence: 95.2,
    platform: "CNN Health"
  },
  {
    id: 3,
    content: "Government announces new tax policy affecting small businesses with annual revenue under $500K, effective immediately nationwide.",
    verdict: "Doubtful" as const,
    reason: "Partial information found in proposed legislation draft, but no official announcement from Treasury Department confirmed.",
    date: "2024-01-14T16:45:00Z",
    source: "blog-post",
    confidence: 72.1,
    platform: "Medium"
  },
  {
    id: 4,
    content: "Celebrity announces retirement from entertainment industry after 20-year career spanning film, television, and music.",
    verdict: "True" as const,
    reason: "Confirmed through official social media channels, press release, and talent agency statement.",
    date: "2024-01-14T14:20:00Z",
    source: "social-media",
    confidence: 91.8,
    platform: "Instagram"
  },
  {
    id: 5,
    content: "Local doctor discovers miracle cure for Type 1 diabetes using revolutionary stem cell therapy, clinical trials show 100% success rate.",
    verdict: "False" as const,
    reason: "No clinical trials registered with NIH, doctor not licensed for research, and no peer-reviewed publications found.",
    date: "2024-01-13T11:30:00Z",
    source: "blog-post",
    confidence: 99.1,
    platform: "Personal Blog"
  }
];

export default function FlaggedContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const filteredContent = mockFlaggedContent.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerdict = verdictFilter === "all" || item.verdict.toLowerCase() === verdictFilter;
    const matchesSource = sourceFilter === "all" || item.source === sourceFilter;
    
    return matchesSearch && matchesVerdict && matchesSource;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-metric-positive";
    if (confidence >= 80) return "text-metric-warning";
    return "text-metric-danger";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Flagged Content</h1>
        <p className="text-muted-foreground mt-2">
          Review and manage content flagged by the AI detection system
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search content or analysis reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={verdictFilter} onValueChange={setVerdictFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by verdict" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verdicts</SelectItem>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                  <SelectItem value="doubtful">Doubtful</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="news-article">News Article</SelectItem>
                  <SelectItem value="blog-post">Blog Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <Card key={item.id} className="shadow-card hover:shadow-elevated transition-smooth">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <VerdictBadge verdict={item.verdict} />
                    <span className="text-sm text-muted-foreground">
                      {item.platform}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className={`text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                      {item.confidence}% confidence
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.date)}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-medium text-foreground mb-2 leading-relaxed">
                    {item.content}
                  </h3>
                </div>

                {/* Analysis */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Analysis Reasoning:
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.reason}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Source: {item.source.replace('-', ' ')}</span>
                  </div>
                  
                  <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-smooth">
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredContent.length} of {mockFlaggedContent.length} results
        </p>
        
        <div className="flex items-center gap-2">
          <button className="p-2 border border-border rounded-md hover:bg-muted transition-smooth">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 text-sm">1</span>
          <button className="p-2 border border-border rounded-md hover:bg-muted transition-smooth">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}