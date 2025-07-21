export interface NetflixData {
  show_id: string;
  type: 'Movie' | 'TV Show';
  title: string;
  director: string;
  cast: string;
  country: string;
  date_added: string;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string;
  year_added?: number;
  month_added?: number;
  day_added?: number;
}

export interface CleanedNetflixData extends NetflixData {
  year_added: number;
  month_added: number;
  day_added: number;
}

export interface ChartData {
  name: string;
  value: number;
  count?: number;
}

export interface GenreData {
  genre: string;
  count: number;
}

export interface CountryData {
  country: string;
  count: number;
}

export interface DirectorData {
  director: string;
  count: number;
}

export interface MonthlyData {
  month: string;
  Movies: number;
  'TV Shows': number;
}

export interface YearlyData {
  year: number;
  Movies: number;
  'TV Shows': number;
}