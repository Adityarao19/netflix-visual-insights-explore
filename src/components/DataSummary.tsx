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
  const cleaningEfficiency = ((data.length / originalCount) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">📁</span>
          </div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Original Dataset</h3>
        </div>
        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{originalCount.toLocaleString()}</p>
        <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">Total records</p>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">✨</span>
          </div>
          <h3 className="font-semibold text-green-900 dark:text-green-100">After Cleaning</h3>
        </div>
        <p className="text-3xl font-bold text-green-700 dark:text-green-300">{data.length.toLocaleString()}</p>
        <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-1">{cleaningEfficiency}% retained</p>
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">🎬</span>
          </div>
          <h3 className="font-semibold text-red-900 dark:text-red-100">Movies</h3>
        </div>
        <p className="text-3xl font-bold text-red-700 dark:text-red-300">{moviesCount.toLocaleString()}</p>
        <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-1">{((moviesCount / data.length) * 100).toFixed(1)}% of catalog</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">📺</span>
          </div>
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">TV Shows</h3>
        </div>
        <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{tvShowsCount.toLocaleString()}</p>
        <p className="text-sm text-purple-600/70 dark:text-purple-400/70 mt-1">{((tvShowsCount / data.length) * 100).toFixed(1)}% of catalog</p>
      </div>
    </div>
  );
};