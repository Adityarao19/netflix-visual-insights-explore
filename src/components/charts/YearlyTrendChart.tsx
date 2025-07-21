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
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
            📊
          </div>
          <CardTitle className="text-xl">Yearly Growth Trends</CardTitle>
        </div>
        <CardDescription className="text-base">
          Peak year: <span className="font-semibold text-emerald-600">{peakYear.year}</span> with {(peakYear.Movies + peakYear['TV Shows']).toLocaleString()} titles, 
          showing Netflix's aggressive content expansion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="year" 
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
              stroke="hsl(var(--chart-4))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--chart-4))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};