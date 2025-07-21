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
    <Card>
      <CardHeader>
        <CardTitle>Word Cloud of Netflix Titles</CardTitle>
        <CardDescription>
          Most frequent words: {topWords}. These reveal Netflix's content themes focusing on drama, comedy, and character-driven narratives.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 justify-center p-4 bg-muted/20 rounded-lg min-h-[300px] items-center">
          {wordFrequency.map(([word, count], index) => {
            const fontSize = Math.max(12, (count / maxCount) * 32);
            const opacity = Math.max(0.6, count / maxCount);
            
            return (
              <span
                key={word}
                className="font-semibold transition-all hover:scale-110 cursor-default"
                style={{
                  fontSize: `${fontSize}px`,
                  opacity,
                  color: index < 10 ? 'hsl(var(--primary))' : 
                         index < 20 ? 'hsl(var(--accent))' : 
                         'hsl(var(--muted-foreground))'
                }}
                title={`${word}: ${count} occurrences`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};