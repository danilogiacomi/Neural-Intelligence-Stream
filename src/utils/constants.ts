import type { Source, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Tech & AI',
    description: 'All the latest news aggregated from tech and AI publications',
    icon: 'layout-grid',
  },
  {
    id: 'developer',
    name: 'Developer & Coding',
    description: 'Tools, libraries, updates, and releases for AI developers',
    icon: 'code-xml',
  },
  {
    id: 'research',
    name: 'Research & Science',
    description: 'Papers, model architecture breakthroughs, and neural discoveries',
    icon: 'microscope',
  },
  {
    id: 'general',
    name: 'AI & Tech Policy',
    description: 'Broad trends, societal impacts, ethics, and general business of AI',
    icon: 'globe',
  },
  {
    id: 'industry',
    name: 'Industry Updates',
    description: 'Big tech shifts, acquisitions, startups, and hardware advancements',
    icon: 'building-2',
  },
];

export const SOURCES: Source[] = [
  {
    id: 'hacker-news',
    name: 'Hacker News (AI)',
    url: 'https://hnrss.org/newest?q=AI|LLM|GPT|Claude|OpenAI|Llama|GPU|ML|Deep+Learning',
    homepage: 'https://news.ycombinator.com',
    category: 'developer',
    iconColor: 'oklch(65% 0.2 45)', // HN Orange
  },
  {
    id: 'openai',
    name: 'OpenAI Blog',
    url: 'https://openai.com/news/rss.xml',
    homepage: 'https://openai.com/news',
    category: 'developer',
    iconColor: 'oklch(35% 0.02 150)', // OpenAI Dark/Sleek charcoal
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    homepage: 'https://huggingface.co',
    category: 'developer',
    iconColor: 'oklch(80% 0.16 90)', // Hugging Face Yellow
  },
  {
    id: 'google-blog',
    name: 'Google Research',
    url: 'https://research.google/blog/rss/',
    homepage: 'https://research.google/blog',
    category: 'research',
    iconColor: 'oklch(62% 0.18 140)', // Google Green
  },
  {
    id: 'mit-tech-review',
    name: 'MIT Tech Review',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    homepage: 'https://technologyreview.com',
    category: 'research',
    iconColor: 'oklch(55% 0.22 15)', // MIT Red
  },
  {
    id: 'the-verge',
    name: 'The Verge (AI)',
    url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
    homepage: 'https://theverge.com/ai-artificial-intelligence',
    category: 'general',
    iconColor: 'oklch(55% 0.25 340)', // Verge Magenta
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch (AI)',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    homepage: 'https://techcrunch.com',
    category: 'industry',
    iconColor: 'oklch(65% 0.22 140)', // TechCrunch Green
  },
  {
    id: 'ars-technica',
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/technology-gamedev',
    homepage: 'https://arstechnica.com',
    category: 'general',
    iconColor: 'oklch(60% 0.2 25)', // Ars Orange
  },
];

export const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json';
export const CACHE_KEY = 'ai_pulse_news_cache';
export const CACHE_TIME_KEY = 'ai_pulse_news_cache_time';
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
