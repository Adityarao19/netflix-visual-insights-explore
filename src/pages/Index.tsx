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
import { Conclusion } from "@/components/Conclusion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data, loading, error } = useNetflixData();

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
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              🎬 Netflix Data Cleaning, Analysis & Visualization
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Complete data science project analyzing Netflix content from 1925-2021. 
              This interactive dashboard performs data cleaning, exploratory data analysis, 
              and generates insights equivalent to a comprehensive Jupyter notebook.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Step 1: Data Cleaning Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">🧹 Step 1: Data Cleaning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Performed data cleaning: removed duplicates, dropped null values in director/cast/country fields, 
              converted date_added to datetime, and created new columns (year_added, month_added, day_added).
            </p>
            <DataSummary data={data} originalCount={originalCount} />
          </CardContent>
        </Card>

        {/* Step 2: EDA & Visualizations */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">📊 Step 2: Exploratory Data Analysis</h2>
            <p className="text-muted-foreground">Interactive visualizations with insights</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ContentTypeChart data={data} />
            <RatingChart data={data} />
          </div>

          <GenreChart data={data} />

          <div className="grid lg:grid-cols-2 gap-8">
            <CountryChart data={data} />
            <DirectorChart data={data} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <MonthlyTrendChart data={data} />
            <YearlyTrendChart data={data} />
          </div>

          <WordCloud data={data} />
        </div>

        {/* Step 3 & 4: Conclusion */}
        <Conclusion data={data} />

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-sm text-muted-foreground">
            📌 This interactive web-based analysis replicates all functionality of a 
            "Netflix_Data_Analysis.ipynb" Jupyter notebook with enhanced interactivity and real-time insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
