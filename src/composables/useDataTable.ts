import { ref, computed, type Ref } from 'vue';
export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};
export function useDataTable<T extends Record<string, any>>(data: Ref<T[]>, initialSortKey: string = '') {
  const filters = ref<Record<string, string>>({});
  const sort = ref<SortConfig>({
    key: initialSortKey,
    direction: 'asc',
  });
  const setFilter = (key: string, value: string) => {
    filters.value = { ...filters.value, [key]: value };
  };
  const toggleSort = (key: string) => {
    if (sort.value.key === key) {
      sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sort.value = { key, direction: 'asc' };
    }
  };
  const clearAll = () => {
    filters.value = {};
    sort.value = { key: initialSortKey, direction: 'asc' };
  };
  const processedData = computed(() => {
    let result = [...data.value];
    // Filter Logic
    const activeFilters = Object.entries(filters.value).filter(([_, v]) => v && v.trim() !== '');
    if (activeFilters.length > 0) {
      result = result.filter((item) => {
        return activeFilters.every(([key, value]) => {
          const itemVal = String(item[key] ?? '').toLowerCase();
          const searchVal = value.toLowerCase();
          return itemVal.includes(searchVal);
        });
      });
    }
    // Sort Logic
    if (sort.value.key) {
      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      result.sort((a, b) => {
        const valA = String(a[sort.value.key] ?? '');
        const valB = String(b[sort.value.key] ?? '');
        const res = collator.compare(valA, valB);
        return sort.value.direction === 'asc' ? res : -res;
      });
    }
    return result;
  });
  return {
    processedData,
    filters,
    sort,
    setFilter,
    toggleSort,
    clearAll,
  };
}