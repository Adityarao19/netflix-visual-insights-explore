import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CleanedNetflixData, MonthlyData } from "@/types/netflix";

interface MonthlyTrendChartProps {
  data: CleanedNetflixData[];
}

export const MonthlyTrendChart = ({ data }: MonthlyTrendChartProps) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthlyData: MonthlyData[] = monthNames.map((month, index) => {
    const monthIndex = index + 1;
    const moviesCount = data.filter(item => 
      item.month_added === monthIndex && item.type === 'Movie'
    ).length;
    const tvShowsCount = data.filter(item => 
      item.month_added === monthIndex && item.type === 'TV Show'
    ).length;

    return {
      month,
      Movies: moviesCount,
      'TV Shows': tvShowsCount
    };
  });

  const peakMonth = monthlyData.reduce((prev, current) => 
    (prev.Movies + prev['TV Shows']) > (current.Movies + current['TV Shows']) ? prev : current
  ).month;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Content Addition Trends</CardTitle>
        <CardDescription>
          {peakMonth} shows the highest content additions, revealing Netflix's strategic release timing to maximize viewer engagement during peak seasons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
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