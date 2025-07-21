import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedNetflixData, GenreData } from "@/types/netflix";

interface GenreChartProps {
  data: CleanedNetflixData[];
}

export const GenreChart = ({ data }: GenreChartProps) => {
  const genreCounts: { [key: string]: number } = {};

  data.forEach(item => {
    const genres = item.listed_in.split(',').map(g => g.trim());
    genres.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  const chartData: GenreData[] = Object.entries(genreCounts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topGenre = chartData[0]?.genre || 'N/A';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Most Frequent Genres</CardTitle>
        <CardDescription>
          "{topGenre}" dominates Netflix's catalog, reflecting the platform's focus on diverse international content and documentaries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="genre" 
              type="category" 
              width={100}
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