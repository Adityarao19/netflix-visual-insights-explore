import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CleanedNetflixData } from "@/types/netflix";
import { useMemo } from "react";

interface WordCloudProps {
  data: CleanedNetflixData[];
}

export const WordCloud = ({ data }: WordCloudProps) => {
  const wordFrequency = useMemo(() => {
    const words: { [key: string]: number } = {};
    
    data.forEach(item => {
      const title = item.title.toLowerCase();
      // Remove common words and split by spaces, punctuation
      const titleWords = title
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => 
          word.length > 3 && 
          !['the', 'and', 'with', 'from', 'that', 'this', 'have', 'they', 'will', 'were', 'been', 'their', 'said', 'each', 'which', 'what', 'your', 'when', 'time', 'them', 'more', 'very', 'some', 'would', 'there', 'first', 'after', 'part', 'work', 'life', 'world', 'love', 'story', 'night', 'great', 'last', 'most', 'into', 'only', 'over', 'also', 'back', 'year', 'years', 'through', 'where', 'much', 'before', 'right', 'think', 'while', 'young'].includes(word)
        );
      
      titleWords.forEach(word => {
        words[word] = (words[word] || 0) + 1;
      });
    });
    
    return Object.entries(words)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 50);
  }, [data]);

  const maxCount = Math.max(...wordFrequency.map(([,count]) => count));
  const topWords = wordFrequency.slice(0, 10).map(([word]) => word).join(', ');

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            ☁️
          </div>
          <CardTitle className="text-xl">Title Word Cloud</CardTitle>
        </div>
        <CardDescription className="text-base">
          Most frequent words: <span className="font-semibold text-indigo-600">{topWords}</span>. 
          These reveal Netflix's content themes focusing on drama, character-driven narratives.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-lg"></div>
          <div className="relative flex flex-wrap gap-3 justify-center p-6 rounded-lg min-h-[350px] items-center">
            {wordFrequency.map(([word, count], index) => {
              const fontSize = Math.max(14, Math.min(40, (count / maxCount) * 42));
              const opacity = Math.max(0.7, count / maxCount);
              
              return (
                <span
                  key={word}
                  className="font-bold transition-all duration-300 hover:scale-110 cursor-pointer rounded-md px-2 py-1 hover:bg-white/50"
                  style={{
                    fontSize: `${fontSize}px`,
                    opacity,
                    color: index < 5 ? 'hsl(var(--chart-1))' : 
                           index < 15 ? 'hsl(var(--chart-3))' : 
                           index < 25 ? 'hsl(var(--chart-5))' :
                           'hsl(var(--muted-foreground))',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                  title={`"${word}" appears ${count} times`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
        
        {/* Word frequency stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">{wordFrequency.length}</div>
            <div className="text-xs text-muted-foreground">Unique Words</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{maxCount}</div>
            <div className="text-xs text-muted-foreground">Max Frequency</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{wordFrequency[0]?.[0] || 'N/A'}</div>
            <div className="text-xs text-muted-foreground">Most Common</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-600">{data.length}</div>
            <div className="text-xs text-muted-foreground">Total Titles</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};