import React from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
import type { Article } from '../types';
import { formatRelativeTime } from '../utils/formatDate';
import { SOURCES } from '../utils/constants';

interface BookmarkPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Article[];
  onRemoveBookmark: (articleId: string) => void;
}

export const BookmarkPanel: React.FC<BookmarkPanelProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
}) => {
  const handleItemClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`bookmark-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className={`bookmark-panel ${isOpen ? 'open' : ''}`}>
        <div className="bookmark-header">
          <h2 className="bookmark-title">
            <Heart size={20} className="text-rose-500" fill="#ff3b30" color="#ff3b30" />
            Saved Articles
          </h2>
          <button
            onClick={onClose}
            className="close-panel-btn"
            aria-label="Close bookmarks"
            title="Close bookmarks"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bookmark-list">
          {bookmarks.length === 0 ? (
            <div className="bookmark-empty">
              <Heart size={48} className="bookmark-empty-icon" />
              <h3 className="empty-state-title">No bookmarks yet</h3>
              <p className="empty-state-desc">
                Articles you bookmark will appear here so you can read them at your convenience.
              </p>
            </div>
          ) : (
            bookmarks.map((article) => {
              const source = SOURCES.find(s => s.id === article.sourceId);
              const sourceColor = source?.iconColor || 'oklch(60% 0.1 250)';

              return (
                <div
                  key={article.id}
                  className="bookmark-item"
                  onClick={() => handleItemClick(article.link)}
                >
                  {/* Small square thumbnail or geometric placeholder */}
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt=""
                      className="bookmark-item-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="bookmark-item-fallback"
                      style={{
                        background: `radial-gradient(circle at center, oklch(18% 0.02 255) 0%, oklch(11% 0.01 260) 100%), linear-gradient(135deg, ${sourceColor} 0%, transparent 80%)`,
                      }}
                    >
                      <Heart size={20} style={{ color: sourceColor, opacity: 0.5 }} />
                    </div>
                  )}

                  {/* Info */}
                  <div className="bookmark-item-info">
                    <span
                      className="bookmark-item-source"
                      style={{ color: sourceColor }}
                    >
                      {article.sourceName}
                    </span>
                    <h4 className="bookmark-item-title" title={article.title}>
                      {article.title}
                    </h4>
                    <span className="bookmark-item-meta">
                      {formatRelativeTime(article.pubDate)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="remove-bookmark-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent clicking item
                      onRemoveBookmark(article.id);
                    }}
                    aria-label="Remove bookmark"
                    title="Remove bookmark"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
