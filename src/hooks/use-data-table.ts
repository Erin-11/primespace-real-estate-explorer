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
    // Pre-process filters to avoid repeated object entry lookups
    const activeFilters = Object.entries(filters).filter(([_, v]) => v !== '');
    if (activeFilters.length > 0) {
      result = result.filter((item) => {
        return activeFilters.every(([key, value]) => {
          const itemValue = item[key] != null ? String(item[key]).toLowerCase() : '';
          const searchValue = value.toLowerCase();
          if (key === 'type' && value !== 'All') {
            return itemValue === searchValue;
          }
          return itemValue.includes(searchValue);
        });
      });
    }
    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const valA = a[sort.key] ?? '';
        const valB = b[sort.key] ?? '';
        // Natural sort for strings (handles addresses, numbers in strings correctly)
        if (typeof valA === 'string' && typeof valB === 'string') {
          const comparison = valA.localeCompare(valB, undefined, { 
            numeric: true, 
            sensitivity: 'base' 
          });
          return sort.direction === 'asc' ? comparison : -comparison;
        }
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
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