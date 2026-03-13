import { useState, useMemo, useCallback } from 'react';
export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};
export function useDataTable<T extends Record<string, any>>(data: T[]) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<SortConfig>({ key: '', direction: null });
  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);
  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      // If clicking a new column or current sort is null, default to 'asc'
      if (prev.key !== key || prev.direction === null) {
        return { key, direction: 'asc' };
      }
      // Cycle: asc -> desc -> null
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key: '', direction: null };
    });
  }, []);
  const clearAll = useCallback(() => {
    setFilters({});
    setSort({ key: '', direction: null });
  }, []);
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    let result = [...data];
    // Filter Logic
    const activeFilters = Object.entries(filters).filter(([_, v]) => v && v.trim() !== '');
    if (activeFilters.length > 0) {
      result = result.filter((item) => {
        return activeFilters.every(([key, value]) => {
          const itemValue = item[key] != null ? String(item[key]).toLowerCase() : '';
          const searchValue = value.toLowerCase().trim();
          if (key === 'type' && value !== 'All') {
            return itemValue === searchValue;
          }
          return itemValue.includes(searchValue);
        });
      });
    }
    // Sort Logic
    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const valA = a[sort.key] ?? '';
        const valB = b[sort.key] ?? '';
        // Handle numeric-aware natural sorting for strings
        const strA = String(valA);
        const strB = String(valB);
        const comparison = strA.localeCompare(strB, undefined, {
          numeric: true,
          sensitivity: 'base'
        });
        return sort.direction === 'asc' ? comparison : -comparison;
      });
    }
    return result;
  }, [data, filters, sort]);
  return {
    processedData,
    filters,
    sort,
    setFilter,
    toggleSort,
    clearAll,
  };
}