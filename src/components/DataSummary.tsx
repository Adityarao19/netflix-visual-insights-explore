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
  const removalPercentage = ((removedCount / originalCount) * 100).toFixed(1);

  return (
    <div className="mt-6 space-y-4">
      {/* Cleaning Process Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4 border border-blue-200/50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span className="text-blue-600">🔄</span> Data Processing Results
          </h4>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
            {cleaningEfficiency}% Clean
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{originalCount.toLocaleString()}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Original Records</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{data.length.toLocaleString()}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Clean Records</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${cleaningEfficiency}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Removed {removedCount.toLocaleString()} records ({removalPercentage}%) with missing essential data
        </div>
      </div>

      {/* Content Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4 border border-red-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xs">🎬</span>
            </div>
            <h4 className="font-semibold text-red-900 dark:text-red-100 text-sm">Movies</h4>
          </div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-300">{moviesCount.toLocaleString()}</div>
          <div className="text-xs text-red-600/70 dark:text-red-400/70">{((moviesCount / data.length) * 100).toFixed(1)}% of catalog</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xs">📺</span>
            </div>
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 text-sm">TV Shows</h4>
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{tvShowsCount.toLocaleString()}</div>
          <div className="text-xs text-purple-600/70 dark:text-purple-400/70">{((tvShowsCount / data.length) * 100).toFixed(1)}% of catalog</div>
        </div>
      </div>

      {/* Data Quality Indicators */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{cleaningEfficiency}%</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Data Retention</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">✓</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Date Validated</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">0</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Duplicates</div>
        </div>
      </div>
    </div>
  );
};