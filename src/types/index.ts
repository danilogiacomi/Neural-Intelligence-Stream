export interface Article {
  id: string;
  title: string;
  link: string;
  pubDate: string; // ISO string or formatted string
  author: string;
  description: string;
  content: string;
  sourceId: string;
  sourceName: string;
  category: 'developer' | 'research' | 'general' | 'industry';
  thumbnail: string | null;
}

export interface Source {
  id: string;
  name: string;
  url: string; // RSS feed URL
  homepage: string;
  category: 'developer' | 'research' | 'general' | 'industry';
  iconColor: string; // HSL color for badge / border
}

export interface Category {
  id: 'all' | 'developer' | 'research' | 'general' | 'industry';
  name: string;
  description: string;
  icon: string; // SVG icon component or name
}
