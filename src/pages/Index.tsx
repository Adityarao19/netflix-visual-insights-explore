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
              <p className="text-sm text-muted-foreground">
                Comprehensive exploratory data analysis with interactive visualizations and trend analysis.
              </p>
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
              <p className="text-sm text-muted-foreground">
                Data-driven insights and actionable recommendations for content strategy.
              </p>
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
      </div>
    </div>
  );
};

export default Index;
