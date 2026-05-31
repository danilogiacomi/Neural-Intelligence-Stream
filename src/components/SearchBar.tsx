import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      onSearch(newValue);
    }, 350); // 350ms debounce
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search AI articles..."
        className="search-input"
        aria-label="Search articles"
      />
      <Search className="search-icon" size={18} />
      {value && (
        <button
          onClick={handleClear}
          className="clear-search-btn"
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
