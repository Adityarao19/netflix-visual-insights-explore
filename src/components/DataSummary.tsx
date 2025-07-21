import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CleanedNetflixData } from "@/types/netflix";

interface DataSummaryProps {
  data: CleanedNetflixData[];
  originalCount: number;
}

export const DataSummary = ({ data, originalCount }: DataSummaryProps) => {
  const removedCount = originalCount - data.length;
  const moviesCount = data.filter(item => item.type === 'Movie').length;
  const tvShowsCount = data.filter(item => item.type === 'TV Show').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Original Dataset</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">{originalCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total records</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">After Cleaning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-accent">{data.length.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Clean records</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-secondary-foreground">{moviesCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{((moviesCount / data.length) * 100).toFixed(1)}% of total</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">TV Shows</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-secondary-foreground">{tvShowsCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{((tvShowsCount / data.length) * 100).toFixed(1)}% of total</p>
        </CardContent>
      </Card>
    </div>
  );
};