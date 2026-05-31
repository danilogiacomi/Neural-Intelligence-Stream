import type { Article } from '../types';
import { SOURCES, RSS_TO_JSON_API, CACHE_KEY, CACHE_TIME_KEY, CACHE_TTL } from './constants';

// Helper to strip HTML tags
function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

// Helper to extract first image URL from HTML content
function extractImageFromHtml(html: string): string | null {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  return img ? img.src : null;
}

// Fetch a single feed and parse it
async function fetchFeed(sourceId: string): Promise<Article[]> {
  const source = SOURCES.find(s => s.id === sourceId);
  if (!source) return [];

  const url = `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(source.url)}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${source.name}: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.status !== 'ok') {
    throw new Error(`Failed to parse ${source.name}: ${data.message || 'Unknown error'}`);
  }

  const items = data.items || [];
  
  return items.map((item: any) => {
    // Generate unique ID based on link or guid
    const id = item.guid || item.link || Math.random().toString(36).substr(2, 9);
    
    // Find thumbnail: either rss2json's thumbnail, enclosure, or extract from description/content
    let thumbnail = item.thumbnail || (item.enclosure && item.enclosure.link) || null;
    if (!thumbnail) {
      thumbnail = extractImageFromHtml(item.description) || extractImageFromHtml(item.content) || null;
    }
    
    // Clean descriptions
    const cleanDescription = stripHtml(item.description || item.content || '').trim();
    
    // Make sure we have a publication date
    let pubDate = item.pubDate;
    try {
      pubDate = new Date(item.pubDate.replace(/-/g, '/')).toISOString();
    } catch (e) {
      pubDate = new Date().toISOString();
    }

    return {
      id,
      title: item.title ? stripHtml(item.title) : 'Untitled',
      link: item.link,
      pubDate,
      author: item.author || source.name,
      description: cleanDescription,
      content: item.content || item.description || '',
      sourceId: source.id,
      sourceName: source.name,
      category: source.category,
      thumbnail: thumbnail,
    };
  });
}

// Fetch all feeds in parallel with local cache
export async function fetchAllNews(forceRefresh = false): Promise<Article[]> {
  // Check cache first unless forceRefresh is true
  if (!forceRefresh) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cachedData && cachedTime) {
      const parsedTime = parseInt(cachedTime, 10);
      const isCacheValid = Date.now() - parsedTime < CACHE_TTL;
      if (isCacheValid) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
          console.error('Failed to parse cached news', e);
        }
      }
    }
  }

  // Fetch all in parallel using Promise.allSettled to fail gracefully if one source is down
  const fetchPromises = SOURCES.map(source => 
    fetchFeed(source.id)
      .catch(error => {
        console.error(`Error fetching feed for ${source.name}:`, error);
        return [] as Article[]; // return empty array if failed
      })
  );

  const results = await Promise.all(fetchPromises);
  
  // Flatten and sort by pubDate (newest first)
  const allArticles = results.flat().sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  // Filter out duplicates (based on title or link)
  const uniqueArticlesMap = new Map<string, Article>();
  allArticles.forEach(article => {
    // Normalize titles to deduplicate articles appearing in multiple feeds
    const normalizedTitle = article.title.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    if (!uniqueArticlesMap.has(normalizedTitle) && !uniqueArticlesMap.has(article.link)) {
      uniqueArticlesMap.set(normalizedTitle, article);
      uniqueArticlesMap.set(article.link, article);
    }
  });

  const uniqueArticles = Array.from(new Set(uniqueArticlesMap.values()));

  // Sort again to be safe
  uniqueArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Cache results
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(uniqueArticles));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
  } catch (e) {
    console.error('Failed to cache news', e);
  }

  return uniqueArticles;
}
