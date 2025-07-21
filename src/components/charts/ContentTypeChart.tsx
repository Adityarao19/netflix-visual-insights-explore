import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedNetflixData, ChartData } from "@/types/netflix";

interface ContentTypeChartProps {
  data: CleanedNetflixData[];
}

export const ContentTypeChart = ({ data }: ContentTypeChartProps) => {
  const chartData: ChartData[] = [
    {
      name: 'Movies',
      value: data.filter(item => item.type === 'Movie').length
    },
    {
      name: 'TV Shows',
      value: data.filter(item => item.type === 'TV Show').length
    }
  ];

  const totalMovies = chartData[0].value;
  const totalTVShows = chartData[1].value;
  const moviePercentage = ((totalMovies / (totalMovies + totalTVShows)) * 100).toFixed(1);

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
            🎬
          </div>
          <CardTitle className="text-xl">Content Distribution</CardTitle>
        </div>
        <CardDescription className="text-base">
          Netflix has <span className="font-semibold text-red-600">{moviePercentage}%</span> movies vs TV shows, 
          showing their film-focused content strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 14, fontWeight: 500 }}
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
            <Bar 
              dataKey="value" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};