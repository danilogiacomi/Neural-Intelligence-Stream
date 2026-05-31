import React from 'react';
import { AlertCircle, Inbox, RotateCw } from 'lucide-react';
import type { Article } from '../types';
import { NewsCard } from './NewsCard';
import { SkeletonCard } from './SkeletonCard';

interface NewsFeedProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  bookmarkedIds: string[];
  onBookmarkToggle: (article: Article) => void;
  onRetry: () => void;
  searchQuery: string;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({
  articles,
  isLoading,
  error,
  bookmarkedIds,
  onBookmarkToggle,
  onRetry,
  searchQuery,
}) => {
  
  // Loading State: Render multiple skeleton cards
  if (isLoading) {
    return (
      <div className="feed-grid">
        {Array.from({ length: 8 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  // Error State: Render a clean warning alert
  if (error) {
    return (
      <div className="error-banner animate-fade-in" style={{ padding: '2rem', flexDirection: 'column', textAlign: 'center', gap: '1rem' }}>
        <AlertCircle size={40} className="error-banner-icon text-rose-500" />
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>Connection Interrupted</h3>
          <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{error}</p>
        </div>
        <button onClick={onRetry} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}>
          <RotateCw size={16} />
          Reload Feeds
        </button>
      </div>
    );
  }

  // Empty State: Filter or search query returned no results
  if (articles.length === 0) {
    return (
      <div className="empty-state glass-panel animate-fade-in">
        <Inbox size={48} className="empty-state-icon" />
        <h3 className="empty-state-title">No articles match your criteria</h3>
        <p className="empty-state-desc">
          {searchQuery
            ? `We couldn't find any articles matching "${searchQuery}". Try modifying your search query.`
            : 'No articles match the selected categories or publisher filters.'}
        </p>
        <button onClick={onRetry} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RotateCw size={16} />
          Reset & Refresh
        </button>
      </div>
    );
  }

  // Standard Feed
  return (
    <div className="feed-grid">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          isBookmarked={bookmarkedIds.includes(article.id)}
          onBookmarkToggle={() => onBookmarkToggle(article)}
        />
      ))}
    </div>
  );
};
