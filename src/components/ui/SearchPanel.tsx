'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/data/menuData';
import { trackSearch, getPopularSearches } from '@/utils/searchAnalytics';
import SearchSuggestions from './SearchSuggestions';
import { debounce } from 'lodash';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurant: string;
  category: string;
  rating?: number;
  ratingCount?: string;
  calories: number;
  time: number;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
    spicy: boolean;
  };
}

interface SearchPanelProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

interface Filter {
  priceRange: string;
  category: string;
  sortBy: string;
  dietary: string[];
}

// Constants
const CONSTANTS = {
  SEARCH_HISTORY_KEY: 'luxury_kitchen_search_history',
  MAX_HISTORY_ITEMS: 5,
  MIN_SEARCH_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
};

// Category options
const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'Main Dishes', label: 'Main Dishes' },
  { id: 'Soups', label: 'Soups' },
  { id: 'Quick Bites', label: 'Quick Bites' },
  { id: 'Appetizers', label: 'Appetizers' },
  { id: 'Grills', label: 'Grills' },
  { id: 'Sides', label: 'Sides' },
];

// Dietary options
const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'glutenFree', label: 'Gluten Free', icon: '🌾' },
  { id: 'halal', label: 'Halal', icon: '🥩' },
  { id: 'spicy', label: 'Spicy', icon: '🌶️' },
];

// Function to parse voice commands
const parseVoiceCommand = (transcript: string): {
  type: 'search' | 'filter' | 'sort' | 'clear';
  value: string;
  filters?: {
    priceRange?: string;
    category?: string;
    sortBy?: string;
    dietary?: string[];
  };
} => {
  const text = transcript.toLowerCase().trim();
  
  // Search commands
  if (text.startsWith('search for') || text.startsWith('find')) {
    const searchTerm = text.replace(/^(search for|find)\s+/i, '');
    return { type: 'search', value: searchTerm };
  }
  
  // Filter commands
  if (text.includes('price')) {
    if (text.includes('under 10') || text.includes('less than 10')) {
      return { type: 'filter', value: '', filters: { priceRange: 'under-10' } };
    } else if (text.includes('between 10 and 20') || text.includes('10 to 20')) {
      return { type: 'filter', value: '', filters: { priceRange: '10-20' } };
    } else if (text.includes('over 20') || text.includes('more than 20')) {
      return { type: 'filter', value: '', filters: { priceRange: 'over-20' } };
    }
  }
  
  // Category commands
  for (const category of categories) {
    if (text.includes(category.label.toLowerCase()) && category.id !== 'all') {
      return { type: 'filter', value: '', filters: { category: category.id } };
    }
  }
  
  // Dietary commands
  for (const option of dietaryOptions) {
    if (text.includes(option.label.toLowerCase())) {
      return { 
        type: 'filter',
        value: '',
        filters: { dietary: [option.id] } 
      };
    }
  }
  
  // Sort commands
  if (text.includes('sort')) {
    if (text.includes('price low') || text.includes('lowest price')) {
      return { type: 'sort', value: 'price-asc' };
    } else if (text.includes('price high') || text.includes('highest price')) {
      return { type: 'sort', value: 'price-desc' };
    } else if (text.includes('rating') || text.includes('best rated')) {
      return { type: 'sort', value: 'rating-desc' };
    }
  }
  
  // Clear commands
  if (text.includes('clear')) {
    if (text.includes('all') || text.includes('everything')) {
      return { type: 'clear', value: 'all' };
    } else if (text.includes('filter')) {
      return { type: 'clear', value: 'filters' };
    }
  }
  
  // Default to treating it as a search
  return { type: 'search', value: text };
};

// Price range options
const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-10', label: 'Under $10', min: 0, max: 10 },
  { id: '10-20', label: '$10 - $20', min: 10, max: 20 },
  { id: 'over-20', label: 'Over $20', min: 20, max: Infinity },
];

// Sort options
const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Highest Rated' },
];

export default function SearchPanel({ isOpen, onCloseAction }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const [popularSearches, setPopularSearches] = useState<{ query: string; count: number }[]>([]);

  const [filters, setFilters] = useState<Filter>({
    priceRange: 'all',
    category: 'all',
    sortBy: 'relevance',
    dietary: [],
  });

  // Add debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string, filters: Filter) => {
        if (query.length < CONSTANTS.MIN_SEARCH_LENGTH) {
          setSearchResults([]);
          return;
        }

        setIsLoading(true);
        setError(null);

        try {
          // Filter menuItems based on search query and filters
          const results = menuItems.filter((item) => {
            // For single letter searches, match the first letter
            if (query.length === 1) {
              return item.name.toLowerCase().startsWith(query.toLowerCase());
            }
            
            // For longer queries, use includes
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                                item.restaurant.toLowerCase().includes(query.toLowerCase());
            
            const matchesPriceRange = filters.priceRange === 'all' ||
              (filters.priceRange === 'under-10' && item.price < 10) ||
              (filters.priceRange === '10-20' && item.price >= 10 && item.price <= 20) ||
              (filters.priceRange === 'over-20' && item.price > 20);

            const matchesCategory = filters.category === 'all' || item.category === filters.category;

            const matchesDietary = filters.dietary.length === 0 ||
              filters.dietary.every(diet => 
                diet in item.dietary && item.dietary[diet as keyof typeof item.dietary]
              );

            return matchesQuery && matchesPriceRange && matchesCategory && matchesDietary;
          });

          // Sort results
          const sortedResults = [...results].sort((a, b) => {
            switch (filters.sortBy) {
              case 'price-asc':
                return a.price - b.price;
              case 'price-desc':
                return b.price - a.price;
              case 'rating-desc':
                return (b.rating || 0) - (a.rating || 0);
              default:
                return 0;
            }
          });

          setSearchResults(sortedResults);
          
          // Track search analytics
          trackSearch(query, {
            priceRange: filters.priceRange,
            category: filters.category,
            dietary: filters.dietary,
          }, sortedResults.length);
          
          // Save to history
          saveToHistory(query);
          
        } catch (err) {
          setError('An error occurred while searching. Please try again.');
          console.error('Search error:', err);
        } finally {
          setIsLoading(false);
        }
      }, CONSTANTS.DEBOUNCE_DELAY),
    []
  );

  // Update search results when query or filters change
  useEffect(() => {
    debouncedSearch(searchQuery, filters);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, filters, debouncedSearch]);

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const command = parseVoiceCommand(transcript);

        switch (command.type) {
          case 'search':
            setSearchQuery(command.value);
            break;
          case 'filter':
            if (command.filters) {
              const filters = command.filters;
              setFilters(prev => ({
                ...prev,
                priceRange: filters.priceRange ?? prev.priceRange,
                category: filters.category ?? prev.category,
                sortBy: filters.sortBy ?? prev.sortBy,
                dietary: filters.dietary ?? prev.dietary,
              }));
              if (!showFilters) {
                setShowFilters(true);
              }
            }
            break;
          case 'sort':
            setFilters(prev => ({ 
              ...prev, 
              sortBy: command.value 
            }));
            if (!showFilters) {
              setShowFilters(true);
            }
            break;
          case 'clear':
            if (command.value === 'all') {
              setSearchQuery('');
              setFilters({
                priceRange: 'all',
                category: 'all',
                sortBy: 'relevance',
                dietary: [],
              });
            } else if (command.value === 'filters') {
              setFilters({
                priceRange: 'all',
                category: 'all',
                sortBy: 'relevance',
                dietary: [],
              });
            }
            break;
        }
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        setVoiceError('Could not recognize voice. Please try again.');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Handle voice search
  const startVoiceSearch = () => {
    if (recognitionRef.current) {
      setVoiceError(null);
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setVoiceError('Voice recognition is not supported in your browser.');
    }
  };

  // Load search history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(CONSTANTS.SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  // Load popular searches on mount
  useEffect(() => {
    setPopularSearches(getPopularSearches());
  }, []);

  // Save search to history
  const saveToHistory = (query: string) => {
    if (query.length >= CONSTANTS.MIN_SEARCH_LENGTH) {
      const newHistory = [query, ...searchHistory.filter(item => item !== query)]
        .slice(0, CONSTANTS.MAX_HISTORY_ITEMS);
      setSearchHistory(newHistory);
      localStorage.setItem(CONSTANTS.SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    }
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(CONSTANTS.SEARCH_HISTORY_KEY);
  };

  // Focus input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Existing shortcuts
      if (e.key === 'Escape' && isOpen) {
        onCloseAction();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && isOpen) {
        e.preventDefault();
        setShowFilters(prev => !prev);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V' && isOpen) {
        e.preventDefault();
        startVoiceSearch();
        return;
      }

      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        if (!isOpen) return;
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Filter navigation shortcuts
      if (showFilters) {
        if (e.altKey && e.key === 'p') {
          e.preventDefault();
          const currentIndex = priceRanges.findIndex(range => range.id === filters.priceRange);
          const nextIndex = (currentIndex + 1) % priceRanges.length;
          setFilters(prev => ({ ...prev, priceRange: priceRanges[nextIndex].id }));
        }

        if (e.altKey && e.key === 'c') {
          e.preventDefault();
          const currentIndex = categories.findIndex(cat => cat.id === filters.category);
          const nextIndex = (currentIndex + 1) % categories.length;
          setFilters(prev => ({ ...prev, category: categories[nextIndex].id }));
        }

        if (e.altKey && e.key === 's') {
          e.preventDefault();
          const currentIndex = sortOptions.findIndex(opt => opt.id === filters.sortBy);
          const nextIndex = (currentIndex + 1) % sortOptions.length;
          setFilters(prev => ({ ...prev, sortBy: sortOptions[nextIndex].id }));
        }

        if (e.altKey && e.key === 'd') {
          e.preventDefault();
          const focusedOption = dietaryOptions[0].id;
          setFilters(prev => ({
            ...prev,
            dietary: prev.dietary.includes(focusedOption)
              ? prev.dietary.filter(d => d !== focusedOption)
              : [...prev.dietary, focusedOption],
          }));
        }

        if (e.altKey && e.key === 'r') {
          e.preventDefault();
          setFilters({
            priceRange: 'all',
            category: 'all',
            sortBy: 'relevance',
            dietary: [],
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCloseAction, startVoiceSearch, showFilters, filters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl max-h-[80vh] overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Voice Search Button */}
          <button
            onClick={startVoiceSearch}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            disabled={isListening}
          >
            <svg
              className={`w-5 h-5 ${isListening ? 'text-primary animate-pulse' : 'text-gray-500'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>

          {/* Close Button */}
          <button
            onClick={onCloseAction}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/food/${item.id}`}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-primary font-medium">${item.price.toFixed(2)}</span>
                      {item.rating && (
                        <div className="flex items-center ml-4">
                          <svg
                            className="w-4 h-4 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                          <span className="ml-1 text-sm text-gray-600">
                            {item.rating} ({item.ratingCount})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <SearchSuggestions
              popularSearches={popularSearches}
              searchHistory={searchHistory}
              onSearch={setSearchQuery}
              onClearHistory={clearHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
}