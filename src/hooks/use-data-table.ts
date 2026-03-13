import { useState, useMemo } from 'react';
export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};
export function useDataTable<T extends Record<string, any>>(data: T[]) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<SortConfig>({ key: '', direction: null });
  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: '', direction: null };
      }
      return { key, direction: 'asc' };
    });
  };
  const clearAll = () => {
    setFilters({});
    setSort({ key: '', direction: null });
  };
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    let result = [...data];
    // Filtering logic
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      result = result.filter((item) => {
        const itemValue = item[key] != null ? String(item[key]).toLowerCase() : '';
        const searchValue = value.toLowerCase();
        if (key === 'type' && value !== 'All') {
          return itemValue === searchValue;
        }
        return itemValue.includes(searchValue);
      });
    });
    // Sorting logic
    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const valA = a[sort.key] ?? '';
        const valB = b[sort.key] ?? '';
        if (typeof valA === 'string' && typeof valB === 'string') {
          const comparison = valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
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