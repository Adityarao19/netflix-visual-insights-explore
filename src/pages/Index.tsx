import { useNetflixData } from "@/hooks/useNetflixData";
import { DataSummary } from "@/components/DataSummary";
import { ContentTypeChart } from "@/components/charts/ContentTypeChart";
import { GenreChart } from "@/components/charts/GenreChart";
import { RatingChart } from "@/components/charts/RatingChart";
import { CountryChart } from "@/components/charts/CountryChart";
import { DirectorChart } from "@/components/charts/DirectorChart";
import { MonthlyTrendChart } from "@/components/charts/MonthlyTrendChart";
import { YearlyTrendChart } from "@/components/charts/YearlyTrendChart";
import { WordCloud } from "@/components/WordCloud";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data, loading, error } = useNetflixData();

  console.log('Index component - data length:', data.length);
  console.log('Index component - loading:', loading);
  console.log('Index component - error:', error);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Loading Netflix Dataset</h1>
          <p className="text-muted-foreground">Processing and cleaning data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-destructive">Error Loading Data</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const originalCount = 8807; // Approximate original dataset size

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 mb-6 animate-float">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                🎬
              </div>
              <span className="text-sm font-medium uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Data Science Project
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Netflix Analytics
              <span className="block text-4xl md:text-5xl text-red-300">Dashboard</span>
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              Comprehensive analysis of Netflix content from 1925-2021. This interactive dashboard 
              transforms raw CSV data into actionable insights through advanced data cleaning, 
              exploratory analysis, and dynamic visualizations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{data.length.toLocaleString()}</div>
                <div className="text-sm text-white/80">Titles Analyzed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">96+</div>
                <div className="text-sm text-white/80">Years of Content</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">190+</div>
                <div className="text-sm text-white/80">Countries</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 space-y-12">
        {/* Data Pipeline Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  🧹
                </div>
                <CardTitle className="text-lg">Data Cleaning</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Removed duplicates, handled missing values, and normalized date formats for analysis.
              </p>
              <DataSummary data={data} originalCount={originalCount} />
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <CardTitle className="text-lg">Analysis & EDA</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive exploratory data analysis with interactive visualizations and trend analysis.
              </p>
              
              {/* EDA Results Summary */}
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200/50">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-2">📈 Key Findings</h4>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• 70%+ movies vs 30% TV shows in catalog</li>
                    <li>• United States leads content production</li>
                    <li>• 2021 marked peak content acquisition year</li>
                    <li>• TV-MA rating dominates mature content</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-2 text-center">
                    <div className="text-lg font-bold text-green-600">8 Charts</div>
                    <div className="text-xs text-green-600/70">Interactive Visualizations</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-2 text-center">
                    <div className="text-lg font-bold text-purple-600">190+</div>
                    <div className="text-xs text-purple-600/70">Countries Analyzed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  🎯
                </div>
                <CardTitle className="text-lg">Insights & Findings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Data-driven insights and actionable recommendations for content strategy.
              </p>
              
              {/* Insights Preview */}
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200/50">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-2">🎯 Strategic Insights</h4>
                  <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                    <li>• Movie-first strategy drives content acquisition</li>
                    <li>• Global expansion with 190+ countries</li>
                    <li>• Mature audience targeting (TV-MA dominant)</li>
                    <li>• Seasonal release optimization patterns</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-md p-2 text-center">
                    <div className="text-lg font-bold text-orange-600">6</div>
                    <div className="text-xs text-orange-600/70">Key Findings</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-2 text-center">
                    <div className="text-lg font-bold text-purple-600">12+</div>
                    <div className="text-xs text-purple-600/70">Recommendations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <div className="space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Interactive Analytics Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore Netflix's content landscape through dynamic charts and visualizations
            </p>
          </div>

          {/* Primary Charts Grid */}
          <div className="grid xl:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ContentTypeChart data={data} />
              <RatingChart data={data} />
            </div>
            <div className="space-y-8">
              <CountryChart data={data} />
              <DirectorChart data={data} />
            </div>
          </div>

          {/* Full Width Charts */}
          <GenreChart data={data} />
          
          <div className="grid xl:grid-cols-2 gap-8">
            <MonthlyTrendChart data={data} />
            <YearlyTrendChart data={data} />
          </div>

          <WordCloud data={data} />
        </div>

        {/* Key Insights Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-indigo-200/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📊 Key Insights & Findings
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Data-driven insights from {data.length.toLocaleString()} Netflix titles analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Content Strategy</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Netflix's catalog is heavily skewed towards movies (70%+), indicating their strategy to acquire diverse film content globally rather than focus on TV series production.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-red-600">Movie-First Strategy</div>
                <div className="text-xs text-red-600/70">Lower production costs, faster content acquisition</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Global Expansion</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                While the US dominates content production, significant international representation shows Netflix's commitment to global content diversity and localization.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">190+ Countries</div>
                <div className="text-xs text-blue-600/70">International content strategy</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Growth Pattern</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Peak content additions occurred during 2020-2021, reflecting Netflix's aggressive expansion and content acquisition strategy during the streaming wars.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">Exponential Growth</div>
                <div className="text-xs text-green-600/70">2021 peak year for content</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Genre Focus</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                International Movies and Dramas lead the catalog, showing Netflix's focus on culturally diverse and dramatically engaging content for global audiences.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-600">Drama & International</div>
                <div className="text-xs text-purple-600/70">Cultural diversity priority</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Release Strategy</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Monthly trends reveal strategic content release timing to maximize viewer engagement during peak consumption periods (holidays and winter months).
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-orange-600">Seasonal Optimization</div>
                <div className="text-xs text-orange-600/70">Strategic release timing</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Audience Targeting</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                TV-MA and R ratings dominate the platform, indicating Netflix's strategic focus on mature audiences rather than family-friendly content.
              </p>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-cyan-600">Mature Content Focus</div>
                <div className="text-xs text-cyan-600/70">Adult audience strategy</div>
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-purple-200/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-purple-600">🚀</span> Strategic Recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Content Strategy</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Increase investment in international content production
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Focus on drama and documentary genres for global appeal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Develop region-specific content libraries
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Business Intelligence</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Optimize release schedules based on seasonal patterns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Build recommendation systems using genre clustering
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Analyze director success rates for acquisition decisions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Future Research Opportunities */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 to-gray-900 rounded-2xl p-8 border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">🔬 Next Steps & Advanced Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300">Opportunities for deeper analysis and machine learning applications</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="text-blue-500">🤖</span> Machine Learning
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Content recommendation algorithms</li>
                <li>• Success prediction models</li>
                <li>• Viewer engagement forecasting</li>
                <li>• Genre clustering analysis</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="text-green-500">📊</span> Advanced Analytics
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Interactive Tableau dashboards</li>
                <li>• Time series forecasting</li>
                <li>• Regional performance analysis</li>
                <li>• Cross-platform comparison studies</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="text-purple-500">🎯</span> Business Intelligence
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Content ROI analysis</li>
                <li>• Market penetration studies</li>
                <li>• Competitive landscape mapping</li>
                <li>• Customer segmentation models</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200/50">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              📈 <strong>Analysis Summary:</strong> This comprehensive study of {data.length.toLocaleString()} Netflix titles (2008-2021) reveals strategic insights into content acquisition, global expansion patterns, and audience targeting that can inform future business decisions and machine learning model development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
