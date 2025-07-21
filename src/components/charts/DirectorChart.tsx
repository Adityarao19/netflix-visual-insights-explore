import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedNetflixData, DirectorData } from "@/types/netflix";

interface DirectorChartProps {
  data: CleanedNetflixData[];
}

export const DirectorChart = ({ data }: DirectorChartProps) => {
  const directorCounts: { [key: string]: number } = {};

  data.forEach(item => {
    const directors = item.director.split(',').map(d => d.trim());
    directors.forEach(director => {
      directorCounts[director] = (directorCounts[director] || 0) + 1;
    });
  });

  const chartData: DirectorData[] = Object.entries(directorCounts)
    .map(([director, count]) => ({ director, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topDirector = chartData[0]?.director || 'N/A';
  const topDirectorCount = chartData[0]?.count || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Directors with Most Titles</CardTitle>
        <CardDescription>
          {topDirector} leads with {topDirectorCount} titles, showcasing Netflix's partnerships with prolific content creators and international filmmakers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="director" 
              type="category" 
              width={120}
              fontSize={12}
            />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Count']}
            />
            <Bar dataKey="count" fill="hsl(var(--accent))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};