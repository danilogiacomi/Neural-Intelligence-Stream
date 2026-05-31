import { useState, useEffect, useCallback } from 'react';
import type { Article } from '../types';

const BOOKMARKS_KEY = 'ai_pulse_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  // Load initial bookmarks on mount
  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load bookmarks', e);
      }
    }
  }, []);

  const addBookmark = useCallback((article: Article) => {
    setBookmarks(prev => {
      if (prev.some(item => item.id === article.id)) return prev;
      const updated = [article, ...prev];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save bookmarks', e);
      }
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((articleId: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(item => item.id !== articleId);
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save bookmarks', e);
      }
      return updated;
    });
  }, []);

  const isBookmarked = useCallback((articleId: string) => {
    return bookmarks.some(item => item.id === articleId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((article: Article) => {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
}
