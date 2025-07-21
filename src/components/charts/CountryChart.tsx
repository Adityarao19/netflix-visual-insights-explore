import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedNetflixData, CountryData } from "@/types/netflix";

interface CountryChartProps {
  data: CleanedNetflixData[];
}

export const CountryChart = ({ data }: CountryChartProps) => {
  const countryCounts: { [key: string]: number } = {};

  data.forEach(item => {
    if (item.country && item.country.trim() !== '' && item.country !== 'Not Given') {
      const countries = item.country.split(',').map(c => c.trim());
      countries.forEach(country => {
        if (country && country !== 'Not Given' && country !== '') {
          countryCounts[country] = (countryCounts[country] || 0) + 1;
        }
      });
    }
  });

  const chartData: CountryData[] = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .filter(item => item.count > 0);

  const topCountry = chartData[0]?.country || 'N/A';
  const usContent = chartData.find(c => c.country === 'United States')?.count || 0;
  const usPercentage = usContent > 0 ? ((usContent / data.length) * 100).toFixed(1) : '0';

  console.log('CountryChart data length:', data.length);
  console.log('CountryChart chartData:', chartData.slice(0, 3));
  console.log('Sample country values:', data.slice(0, 5).map(d => d.country));

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
            🌍
          </div>
          <CardTitle className="text-xl">Global Content Distribution</CardTitle>
        </div>
        <CardDescription className="text-base">
          <span className="font-semibold text-green-600">{topCountry}</span> leads with {usPercentage}% 
          of content, showcasing Netflix's global but US-focused strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart 
            data={chartData} 
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              type="number" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              dataKey="country" 
              type="category" 
              width={100}
              tick={{ fontSize: 11, fontWeight: 500 }}
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
              fill="hsl(var(--chart-4))" 
              radius={[0, 4, 4, 0]}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};