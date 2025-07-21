import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CleanedNetflixData } from "@/types/netflix";

interface ConclusionProps {
  data: CleanedNetflixData[];
}

export const Conclusion = ({ data }: ConclusionProps) => {
  const moviesCount = data.filter(item => item.type === 'Movie').length;
  const tvShowsCount = data.filter(item => item.type === 'TV Show').length;
  const moviePercentage = ((moviesCount / data.length) * 100).toFixed(1);
  
  const yearRange = {
    min: Math.min(...data.map(item => item.year_added)),
    max: Math.max(...data.map(item => item.year_added))
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">🧠 Key Findings & Conclusion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-accent">📊 Key Insights</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Content Distribution:</strong> Netflix's catalog is heavily skewed towards movies ({moviePercentage}%), indicating their strategy to acquire diverse film content globally.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Global Reach:</strong> The United States dominates content production, but significant international representation shows Netflix's commitment to global content diversity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Content Strategy:</strong> Peak additions occurred during {yearRange.max}, reflecting Netflix's aggressive expansion and content acquisition strategy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Genre Focus:</strong> International Movies and Dramas lead the catalog, showing Netflix's focus on culturally diverse and dramatically engaging content.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Seasonal Patterns:</strong> Monthly trends reveal strategic content release timing to maximize viewer engagement during peak consumption periods.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-accent">🚀 Next Steps & Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Machine Learning Opportunities</h4>
              <ul className="text-sm space-y-1">
                <li>• Build content recommendation systems</li>
                <li>• Predict successful content genres</li>
                <li>• Analyze viewer engagement patterns</li>
                <li>• Content similarity clustering</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Advanced Analytics</h4>
              <ul className="text-sm space-y-1">
                <li>• Create interactive Tableau dashboards</li>
                <li>• Time series forecasting for content planning</li>
                <li>• Regional content performance analysis</li>
                <li>• Cross-platform comparison studies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium text-center">
            📈 This analysis of {data.length.toLocaleString()} Netflix titles ({yearRange.min}-{yearRange.max}) reveals strategic insights into content acquisition, global expansion, and audience targeting that can inform future business decisions and ML model development.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};