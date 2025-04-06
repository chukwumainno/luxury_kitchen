interface SearchAnalytics {
  query: string;
  timestamp: number;
  filters: {
    priceRange: string;
    category: string;
    dietary: string[];
  };
  resultsCount: number;
}

const ANALYTICS_KEY = 'luxury_kitchen_search_analytics';
const MAX_ANALYTICS_ITEMS = 100;

export const trackSearch = (
  query: string,
  filters: { priceRange: string; category: string; dietary: string[] },
  resultsCount: number
) => {
  try {
    const analytics: SearchAnalytics[] = JSON.parse(
      localStorage.getItem(ANALYTICS_KEY) || '[]'
    );

    const newAnalytics = [
      {
        query,
        timestamp: Date.now(),
        filters,
        resultsCount,
      },
      ...analytics,
    ].slice(0, MAX_ANALYTICS_ITEMS);

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(newAnalytics));
  } catch (error) {
    console.error('Failed to track search:', error);
  }
};

export const getPopularSearches = (limit = 5): { query: string; count: number }[] => {
  try {
    const analytics: SearchAnalytics[] = JSON.parse(
      localStorage.getItem(ANALYTICS_KEY) || '[]'
    );

    const searchCounts = analytics.reduce((acc, { query }) => {
      acc[query] = (acc[query] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(searchCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to get popular searches:', error);
    return [];
  }
};

export const getSearchStats = () => {
  try {
    const analytics: SearchAnalytics[] = JSON.parse(
      localStorage.getItem(ANALYTICS_KEY) || '[]'
    );

    const totalSearches = analytics.length;
    const averageResultsCount =
      analytics.reduce((sum, { resultsCount }) => sum + resultsCount, 0) /
      totalSearches;

    const popularCategories = analytics.reduce((acc, { filters }) => {
      acc[filters.category] = (acc[filters.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popularDietary = analytics.reduce((acc, { filters }) => {
      filters.dietary.forEach((diet) => {
        acc[diet] = (acc[diet] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSearches,
      averageResultsCount,
      popularCategories: Object.entries(popularCategories)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
      popularDietary: Object.entries(popularDietary)
        .map(([diet, count]) => ({ diet, count }))
        .sort((a, b) => b.count - a.count),
    };
  } catch (error) {
    console.error('Failed to get search stats:', error);
    return {
      totalSearches: 0,
      averageResultsCount: 0,
      popularCategories: [],
      popularDietary: [],
    };
  }
}; 