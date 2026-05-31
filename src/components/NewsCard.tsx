import React from 'react';
import { Heart, Calendar, ArrowUpRight, Cpu, Sparkles, Brain, Code } from 'lucide-react';
import type { Article } from '../types';
import { SourceBadge } from './SourceBadge';
import { formatRelativeTime } from '../utils/formatDate';
import { SOURCES } from '../utils/constants';

interface NewsCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmarkToggle: (e: React.MouseEvent) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const source = SOURCES.find(s => s.id === article.sourceId);
  const sourceColor = source?.iconColor || 'oklch(60% 0.1 250)';

  // Choose an icon based on category
  const renderFallbackIcon = () => {
    const iconSize = 40;
    const className = "media-fallback-icon animate-pulse";
    switch (article.category) {
      case 'developer':
        return <Code size={iconSize} className={className} style={{ color: sourceColor }} />;
      case 'research':
        return <Brain size={iconSize} className={className} style={{ color: sourceColor }} />;
      case 'industry':
        return <Cpu size={iconSize} className={className} style={{ color: sourceColor }} />;
      default:
        return <Sparkles size={iconSize} className={className} style={{ color: sourceColor }} />;
    }
  };

  const handleCardClick = () => {
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="news-card glass-panel animate-fade-in" onClick={handleCardClick}>
      {/* Media section */}
      <div className="news-card-media">
        <SourceBadge sourceId={article.sourceId} sourceName={article.sourceName} />
        
        <button
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // prevent opening the article
            onBookmarkToggle(e);
          }}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
        >
          <Heart size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="news-card-img"
            loading="lazy"
            onError={(e) => {
              // If image fails to load, null it out to show fallback
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = parent.querySelector('.media-fallback');
                if (fallback) (fallback as HTMLElement).style.display = 'flex';
              }
            }}
          />
        ) : null}

        {/* Fallback geometric background */}
        <div
          className="media-fallback"
          style={{
            display: article.thumbnail ? 'none' : 'flex',
            background: `radial-gradient(circle at center, oklch(18% 0.02 255) 0%, oklch(11% 0.01 260) 100%), linear-gradient(135deg, ${sourceColor} 0%, transparent 80%)`,
            borderBottom: `2px solid ${sourceColor}`
          }}
        >
          {renderFallbackIcon()}
        </div>
      </div>

      {/* Content section */}
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-card-date">
            <Calendar size={12} />
            {formatRelativeTime(article.pubDate)}
          </span>
          <span style={{ textTransform: 'capitalize' }}>{article.category}</span>
        </div>

        <h3 className="news-card-title" title={article.title}>
          {article.title}
        </h3>

        <p className="news-card-desc">
          {article.description || 'No summary available. Click "Read Article" to view full contents.'}
        </p>

        <div className="news-card-footer">
          <span className="news-card-author" title={article.author}>
            By {article.author}
          </span>
          <span className="news-card-readmore">
            Read Source
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
};
