import { useState, useMemo } from 'react';
import { useNews } from './hooks/useNews';
import { useBookmarks } from './hooks/useBookmarks';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { NewsFeed } from './components/NewsFeed';
import { BookmarkPanel } from './components/BookmarkPanel';
import { Footer } from './components/Footer';
import { Sparkles, Terminal } from 'lucide-react';
import { SOURCES } from './utils/constants';
function App() {
  useTheme(); // Hook applies theme attributes automatically
  const { articles, isLoading, error, refetch } = useNews();
  const { bookmarks, toggleBookmark, removeBookmark } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Toggle dynamic source filtering
  const handleToggleSource = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  // Reset all filters and search query
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSources([]);
  };

  // Filter and search articles dynamically
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      // 2. Source Filter
      if (selectedSources.length > 0 && !selectedSources.includes(article.sourceId)) {
        return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesDesc = article.description.toLowerCase().includes(query);
        const matchesAuthor = article.author.toLowerCase().includes(query);
        const matchesSource = article.sourceName.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesAuthor || matchesSource;
      }

      return true;
    });
  }, [articles, selectedCategory, selectedSources, searchQuery]);

  // Bookmarked article IDs for easy mapping
  const bookmarkedIds = useMemo(() => {
    return bookmarks.map((b) => b.id);
  }, [bookmarks]);

  return (
    <div className="app-container">
      {/* Sticky Navigation */}
      <Header
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onSearch={setSearchQuery}
        onLogoClick={handleResetFilters}
      />

      {/* Main Aggregator Panel */}
      <main className="main-content">
        {/* Dynamic Hero Section */}
        <section className="hero-section glass-panel">
          <div className="hero-subtitle">
            <Terminal size={14} />
            <span>Neural Intelligence Stream</span>
          </div>
          <h1 className="hero-title">Stay Ahead of the AI Curve</h1>
          <p className="hero-desc">
            The developer-first command center aggregating live technical breakthroughs, paper releases, and open-source models in real time.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => refetch()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} />
              Aggregating Live News
            </button>
          </div>
        </section>

        {/* Filters */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedSources={selectedSources}
          onToggleSource={handleToggleSource}
          onClearFilters={handleResetFilters}
        />

        {/* Dynamic Info Status */}
        <div className="feed-header">
          <span className="feed-status">
            {isLoading
              ? 'Fetching neural feeds...'
              : `Surfacing ${filteredArticles.length} of ${articles.length} curated updates`}
          </span>
          {!isLoading && !error && (
            <button
              onClick={() => refetch()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Force Refresh
            </button>
          )}
        </div>

        {/* Feed Grid */}
        <NewsFeed
          articles={filteredArticles}
          isLoading={isLoading}
          error={error}
          bookmarkedIds={bookmarkedIds}
          onBookmarkToggle={toggleBookmark}
          onRetry={refetch}
          searchQuery={searchQuery}
        />
      </main>

      {/* Sliding Bookmark Sidebar Panel */}
      <BookmarkPanel
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={removeBookmark}
      />

      {/* Footer */}
      <Footer totalFeeds={SOURCES.length} />
    </div>
  );
}

export default App;
