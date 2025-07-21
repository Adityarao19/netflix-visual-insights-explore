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

  const peakMonth = monthlyData.length > 0 ? monthlyData.reduce((prev, current) => 
    (prev.Movies + prev['TV Shows']) > (current.Movies + current['TV Shows']) ? prev : current
  ).month : 'N/A';

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
            📈
          </div>
          <CardTitle className="text-xl">Monthly Trends</CardTitle>
        </div>
        <CardDescription className="text-base">
          <span className="font-semibold text-cyan-600">{peakMonth}</span> shows peak additions, 
          revealing Netflix's strategic release timing for maximum engagement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart 
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Titles']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '14px', fontWeight: '500' }} />
            <Line 
              type="monotone" 
              dataKey="Movies" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="TV Shows" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--chart-3))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};