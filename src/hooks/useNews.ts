import { useState, useEffect, useCallback } from 'react';
import type { Article } from '../types';
import { fetchAllNews } from '../utils/fetchRss';

export function useNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllNews(forceRefresh);
      setArticles(data);
    } catch (e: any) {
      setError(e.message || 'An error occurred while fetching news.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const refetch = useCallback(() => {
    return loadNews(true);
  }, [loadNews]);

  return { articles, isLoading, error, refetch };
}
