import { useMemo, useState, useEffect, useRef } from 'react';
import { menuItems } from '@/data/menuData';

interface SearchSuggestionsProps {
  popularSearches: { query: string; count: number }[];
  searchHistory: string[];
  onSearch: (query: string) => void;
  onClearHistory: () => void;
}

export default function SearchSuggestions({ 
  popularSearches, 
  searchHistory, 
  onSearch, 
  onClearHistory 
}: SearchSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Combine popular searches and search history
  const suggestions = useMemo(() => {
    const results = new Set<string>();
    
    // Add popular searches
    popularSearches.forEach(item => {
      results.add(item.query);
    });
    
    // Add search history
    searchHistory.forEach(search => {
      results.add(search);
    });
    
    return Array.from(results).slice(0, 6); // Limit to 6 suggestions
  }, [popularSearches, searchHistory]);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const listItems = suggestionsRef.current.getElementsByTagName('li');
      if (listItems.length > selectedIndex) {
        const selectedElement = listItems[selectedIndex] as HTMLElement;
        selectedElement?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  if (suggestions.length === 0) return null;

  return (
    <div className="p-4">
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</h3>
            <button 
              onClick={onClearHistory}
              className="text-xs text-orange-500 hover:text-orange-600"
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-2">
            {searchHistory.slice(0, 5).map((query, index) => (
              <li key={index}>
                <button
                  onClick={() => onSearch(query)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {query}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {popularSearches.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Searches</h3>
          <ul className="space-y-2">
            {popularSearches.slice(0, 5).map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => onSearch(item.query)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    {item.query}
                  </div>
                  <span className="text-xs text-gray-400">{item.count}x</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 