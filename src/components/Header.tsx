import React from 'react';
import { Zap, Heart } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onSearch: (query: string) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  bookmarkCount,
  onOpenBookmarks,
  onSearch,
  onLogoClick,
}) => {
  return (
    <header className="header">
      {/* Brand logo */}
      <div className="header-logo" onClick={onLogoClick} title="Go home">
        <Zap className="header-logo-icon" fill="currentColor" />
        <span className="logo-text">NEURAL INTELLIGENCE STREAM</span>
      </div>

      {/* Actions */}
      <div className="header-actions">
        {/* Search bar */}
        <SearchBar onSearch={onSearch} />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Bookmarks toggle */}
        <button
          onClick={onOpenBookmarks}
          className="control-btn"
          aria-label="View saved articles"
          title="View saved articles"
        >
          <Heart size={20} />
          {bookmarkCount > 0 && (
            <span className="control-btn-badge animate-pulse">
              {bookmarkCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
