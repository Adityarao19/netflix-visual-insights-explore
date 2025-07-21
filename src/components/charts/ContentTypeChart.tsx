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
    <Card>
      <CardHeader>
        <CardTitle>Distribution of Movies vs TV Shows</CardTitle>
        <CardDescription>
          Netflix has significantly more movies ({moviePercentage}%) than TV shows, indicating their content strategy focuses heavily on film acquisitions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Count']}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};