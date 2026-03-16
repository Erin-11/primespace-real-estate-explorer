import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/lib/api-client';
import type { WatchlistItem } from '@shared/types';
import { toast } from 'sonner';
export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlist = ref<WatchlistItem[]>([]);
  const isLoading = ref(false);
  async function fetchWatchlist() {
    isLoading.value = true;
    try {
      const data = await api<WatchlistItem[]>('/api/watchlist');
      watchlist.value = data;
    } catch (error) {
      console.error('Failed to fetch watchlist', error);
    } finally {
      isLoading.value = false;
    }
  }
  async function toggleBookmark(item: { id: string; building: string; departmentId: string; type: string }) {
    const existing = watchlist.value.find((i) => i.id === item.id);
    if (existing) {
      try {
        await api(`/api/watchlist/${item.id}`, { method: 'DELETE' });
        watchlist.value = watchlist.value.filter((i) => i.id !== item.id);
        toast.info(`Removed ${item.building} from watchlist`);
      } catch (e) {
        toast.error('Failed to remove bookmark');
      }
    } else {
      try {
        const newItem = await api<WatchlistItem>('/api/watchlist', {
          method: 'POST',
          body: JSON.stringify(item),
        });
        watchlist.value = [newItem, ...watchlist.value];
        toast.success(`Bookmarked ${item.building}`);
      } catch (e) {
        toast.error('Failed to bookmark property');
      }
    }
  }
  const isBookmarked = (id: string) => watchlist.value.some((item) => item.id === id);
  return {
    watchlist,
    isLoading,
    fetchWatchlist,
    toggleBookmark,
    isBookmarked,
  };
});