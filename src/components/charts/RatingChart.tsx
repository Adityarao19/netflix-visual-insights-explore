import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CleanedNetflixData, ChartData } from "@/types/netflix";

interface RatingChartProps {
  data: CleanedNetflixData[];
}

export const RatingChart = ({ data }: RatingChartProps) => {
  const ratingCounts: { [key: string]: number } = {};

  data.forEach(item => {
    const rating = item.rating && item.rating.trim() !== '' ? item.rating : 'Unrated';
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  });

  const chartData: ChartData[] = Object.entries(ratingCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
    .filter(item => item.value > 0);

  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(262, 83%, 58%)',
    'hsl(142, 71%, 45%)',
    'hsl(25, 95%, 53%)'
  ];

  const topRating = chartData[0]?.name || 'N/A';
  const topRatingPercentage = chartData[0] && data.length > 0 ? ((chartData[0].value / data.length) * 100).toFixed(1) : '0';

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            🏆
          </div>
          <CardTitle className="text-xl">Content Ratings</CardTitle>
        </div>
        <CardDescription className="text-base">
          <span className="font-semibold text-blue-600">"{topRating}"</span> dominates at {topRatingPercentage}%, 
          reflecting Netflix's broad audience strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`rating-cell-${entry.name}-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Titles']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};