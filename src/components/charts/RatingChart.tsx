import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CleanedNetflixData, ChartData } from "@/types/netflix";

interface RatingChartProps {
  data: CleanedNetflixData[];
}

export const RatingChart = ({ data }: RatingChartProps) => {
  const ratingCounts: { [key: string]: number } = {};

  data.forEach(item => {
    const rating = item.rating || 'Unrated';
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  });

  const chartData: ChartData[] = Object.entries(ratingCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--secondary))',
    'hsl(210, 100%, 50%)',
    'hsl(300, 100%, 50%)',
    'hsl(60, 100%, 50%)',
    'hsl(120, 100%, 50%)',
    'hsl(180, 100%, 50%)'
  ];

  const topRating = chartData[0]?.name || 'N/A';
  const topRatingPercentage = chartData[0] ? ((chartData[0].value / data.length) * 100).toFixed(1) : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution (Top 8)</CardTitle>
        <CardDescription>
          "{topRating}" rated content makes up {topRatingPercentage}% of Netflix's catalog, indicating their focus on broader audience appeal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Count']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};