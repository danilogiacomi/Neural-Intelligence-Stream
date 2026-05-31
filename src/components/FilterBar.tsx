import React from 'react';
import { LayoutGrid, Code2, Brain, Globe, Building2 } from 'lucide-react';
import { CATEGORIES, SOURCES } from '../utils/constants';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSources: string[];
  onToggleSource: (sourceId: string) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSources,
  onToggleSource,
  onClearFilters,
}) => {
  
  // Icon selector based on category ID
  const getCategoryIcon = (id: string, size = 16) => {
    switch (id) {
      case 'developer':
        return <Code2 size={size} />;
      case 'research':
        return <Brain size={size} />;
      case 'general':
        return <Globe size={size} />;
      case 'industry':
        return <Building2 size={size} />;
      default:
        return <LayoutGrid size={size} />;
    }
  };

  const isAllSourcesSelected = selectedSources.length === 0;

  return (
    <div className="filter-bar glass-panel animate-fade-in">
      {/* Categories section */}
      <div className="filter-section">
        <span className="filter-label">Categories</span>
        <div className="filter-chips">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`chip ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {getCategoryIcon(category.id)}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sources section */}
      <div className="filter-section" style={{ marginTop: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="filter-label">Filter by Publisher</span>
          {(!isAllSourcesSelected || selectedCategory !== 'all') && (
            <button
              onClick={onClearFilters}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
        <div className="sources-scroll">
          <button
            onClick={() => {
              // Clicking "All Sources" clears source filter
              if (selectedSources.length > 0) {
                onClearFilters();
              }
            }}
            className={`source-chip ${isAllSourcesSelected ? 'active' : ''}`}
          >
            All Publishers
          </button>
          
          {SOURCES.map((source) => {
            const isSelected = selectedSources.includes(source.id);
            return (
              <button
                key={source.id}
                onClick={() => onToggleSource(source.id)}
                className={`source-chip ${isSelected ? 'active' : ''}`}
              >
                <span
                  className="source-dot"
                  style={{
                    backgroundColor: source.iconColor,
                    boxShadow: isSelected ? `0 0 6px ${source.iconColor}` : 'none',
                  }}
                />
                {source.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
