import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedNetflixData, CountryData } from "@/types/netflix";

interface CountryChartProps {
  data: CleanedNetflixData[];
}

export const CountryChart = ({ data }: CountryChartProps) => {
  const countryCounts: { [key: string]: number } = {};

  data.forEach(item => {
    const countries = item.country.split(',').map(c => c.trim());
    countries.forEach(country => {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
  });

  const chartData: CountryData[] = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topCountry = chartData[0]?.country || 'N/A';
  const usContent = chartData.find(c => c.country === 'United States')?.count || 0;
  const usPercentage = ((usContent / data.length) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Countries with Most Content</CardTitle>
        <CardDescription>
          {topCountry} leads Netflix's content production, with US content representing {usPercentage}% of the total catalog, showing Netflix's global but US-centric approach.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="country" 
              type="category" 
              width={80}
              fontSize={12}
            />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Count']}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};