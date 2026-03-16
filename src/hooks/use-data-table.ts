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
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: '', direction: null };
      }
      return { key, direction: 'asc' };
    });
  }, []);
  const clearAll = useCallback(() => {
    setFilters({});
    setSort({ key: '', direction: null });
  }, []);
  const processedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    let result = [...data];
    // Filter Logic: Institutional Grade Multi-column matching with null safety
    const activeFilterEntries = Object.entries(filters).filter(
      ([_, v]) => v !== undefined && v !== null && String(v).trim() !== ''
    );
    if (activeFilterEntries.length > 0) {
      result = result.filter((item) => {
        if (!item) return false;
        return activeFilterEntries.every(([key, value]) => {
          const rawValue = item[key];
          const itemValue = (rawValue === undefined || rawValue === null) 
            ? '' 
            : String(rawValue).toLowerCase().trim();
          const searchValue = String(value).toLowerCase().trim();
          if (key === 'type' && searchValue !== 'all') {
            return itemValue === searchValue;
          }
          return itemValue.includes(searchValue);
        });
      });
    }
    // Sort Logic: Robust natural numeric sorting with existence checks
    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const valA = a?.[sort.key];
        const valB = b?.[sort.key];
        const strA = (valA === null || valA === undefined) ? '' : String(valA);
        const strB = (valB === null || valB === undefined) ? '' : String(valB);
        try {
          const comparison = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base'
          }).compare(strA, strB);
          return sort.direction === 'asc' ? comparison : -comparison;
        } catch (e) {
          console.error('[DataTable Engine] Sorting error:', e);
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