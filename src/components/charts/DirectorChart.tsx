import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedNetflixData, DirectorData } from "@/types/netflix";

interface DirectorChartProps {
  data: CleanedNetflixData[];
}

export const DirectorChart = ({ data }: DirectorChartProps) => {
  const directorCounts: { [key: string]: number } = {};

  data.forEach(item => {
    if (item.director && item.director.trim() !== '') {
      const directors = item.director.split(',').map(d => d.trim());
      directors.forEach(director => {
        if (director && director !== 'Not Given' && director !== '') {
          directorCounts[director] = (directorCounts[director] || 0) + 1;
        }
      });
    }
  });

  const chartData: DirectorData[] = Object.entries(directorCounts)
    .map(([director, count]) => ({ director, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .filter(item => item.count > 0);

  const topDirector = chartData[0]?.director || 'N/A';
  const topDirectorCount = chartData[0]?.count || 0;

  console.log('DirectorChart data length:', data.length);
  console.log('DirectorChart chartData:', chartData.slice(0, 3));

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
            🎬
          </div>
          <CardTitle className="text-xl">Top Directors</CardTitle>
        </div>
        <CardDescription className="text-base">
          <span className="font-semibold text-orange-600">{topDirector}</span> leads with {topDirectorCount} titles, 
          showcasing Netflix's partnerships with prolific creators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart 
            data={chartData} 
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 140, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              type="number" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              dataKey="director" 
              type="category" 
              width={140}
              tick={{ fontSize: 10, fontWeight: 500 }}
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
              dataKey="count" 
              fill="hsl(var(--chart-2))" 
              radius={[0, 4, 4, 0]}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};