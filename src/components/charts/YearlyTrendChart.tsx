import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CleanedNetflixData, YearlyData } from "@/types/netflix";

interface YearlyTrendChartProps {
  data: CleanedNetflixData[];
}

export const YearlyTrendChart = ({ data }: YearlyTrendChartProps) => {
  const yearCounts: { [key: number]: { Movies: number; 'TV Shows': number } } = {};

  data.forEach(item => {
    const year = item.year_added;
    if (!yearCounts[year]) {
      yearCounts[year] = { Movies: 0, 'TV Shows': 0 };
    }
    if (item.type === 'Movie') {
      yearCounts[year].Movies++;
    } else {
      yearCounts[year]['TV Shows']++;
    }
  });

  const chartData: YearlyData[] = Object.entries(yearCounts)
    .map(([year, counts]) => ({
      year: parseInt(year),
      Movies: counts.Movies,
      'TV Shows': counts['TV Shows']
    }))
    .sort((a, b) => a.year - b.year);

  const peakYear = chartData.length > 0 ? chartData.reduce((prev, current) => 
    (prev.Movies + prev['TV Shows']) > (current.Movies + current['TV Shows']) ? prev : current
  ) : { year: 0, Movies: 0, 'TV Shows': 0 };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yearly Content Addition Trends</CardTitle>
        <CardDescription>
          {peakYear.year} marked Netflix's peak content expansion with {(peakYear.Movies + peakYear['TV Shows']).toLocaleString()} additions, reflecting their aggressive growth strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Movies" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
            />
            <Line 
              type="monotone" 
              dataKey="TV Shows" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};