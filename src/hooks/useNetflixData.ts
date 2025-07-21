import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { NetflixData, CleanedNetflixData } from '@/types/netflix';

export const useNetflixData = () => {
  const [data, setData] = useState<CleanedNetflixData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ldgoybrizperuayocmdy.supabase.co/storage/v1/object/public/netflixcsv/netflix1.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const rawData = results.data as NetflixData[];
            const cleanedData = cleanData(rawData);
            setData(cleanedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cleanData = (rawData: NetflixData[]): CleanedNetflixData[] => {
    // Remove duplicates based on show_id
    const uniqueData = rawData.filter((item, index, self) => 
      index === self.findIndex(t => t.show_id === item.show_id)
    );

    // Clean and process data - less restrictive filtering
    const cleaned = uniqueData
      .filter(item => 
        item.date_added && item.date_added.trim() !== ''
      )
      .map(item => {
        const dateAdded = new Date(item.date_added);
        
        return {
          ...item,
          release_year: Number(item.release_year) || 0,
          year_added: dateAdded.getFullYear(),
          month_added: dateAdded.getMonth() + 1,
          day_added: dateAdded.getDate(),
        };
      })
      .filter(item => !isNaN(item.year_added));

    return cleaned as CleanedNetflixData[];
  };

  return { data, loading, error };
};