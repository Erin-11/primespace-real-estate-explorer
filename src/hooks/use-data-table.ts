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
      // If we're already sorting by this key, cycle through states
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: '', direction: null };
      }
      // New key or starting fresh
      return { key, direction: 'asc' };
    });
  }, []);
  const clearAll = useCallback(() => {
    setFilters({});
    setSort({ key: '', direction: null });
  }, []);
  const processedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (data.length === 0) return [];
    let result = [...data];
    // Filter Logic: Institutional Grade Multi-column matching
    const activeFilterEntries = Object.entries(filters).filter(
      ([_, v]) => v !== undefined && v !== null && String(v).trim() !== ''
    );
    if (activeFilterEntries.length > 0) {
      result = result.filter((item) => {
        return activeFilterEntries.every(([key, value]) => {
          if (!item || item[key] === undefined || item[key] === null) return false;
          const itemValue = String(item[key]).toLowerCase().trim();
          const searchValue = String(value).toLowerCase().trim();
          // Special handling for categorical "Type" filter
          if (key === 'type' && searchValue !== 'all') {
            return itemValue === searchValue;
          }
          // General case: substring match
          return itemValue.includes(searchValue);
        });
      });
    }
    // Sort Logic: Robust natural numeric sorting (e.g., floor 10 > floor 2)
    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const valA = a[sort.key];
        const valB = b[sort.key];
        // Ensure we're comparing strings safely
        const strA = valA === null || valA === undefined ? '' : String(valA);
        const strB = valB === null || valB === undefined ? '' : String(valB);
        try {
          // Use Intl.Collator for high-performance, locale-aware, numeric-sensitive sorting
          const comparison = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base'
          }).compare(strA, strB);
          return sort.direction === 'asc' ? comparison : -comparison;
        } catch (e) {
          console.error('[DataTable Engine] Sorting crash for key:', sort.key, e);
          return 0;
        }
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