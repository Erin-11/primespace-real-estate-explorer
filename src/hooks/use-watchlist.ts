import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { WatchlistItem } from '@shared/types';
import { toast } from 'sonner';
export function useWatchlist() {
  const queryClient = useQueryClient();
  const { data: watchlist = [], isLoading } = useQuery<WatchlistItem[]>({
    queryKey: ['watchlist'],
    queryFn: () => api<WatchlistItem[]>('/api/watchlist'),
    staleTime: 1000 * 60 * 5,
  });
  const addMutation = useMutation({
    mutationFn: (item: Omit<WatchlistItem, 'timestamp'>) =>
      api<WatchlistItem>('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify(item)
      }),
    onSuccess: (newItem) => {
      queryClient.setQueryData(['watchlist'], (old: WatchlistItem[] = []) => [newItem, ...old]);
      toast.success(`Bookmarked ${newItem.building}`);
    },
    onError: () => {
      toast.error('Failed to bookmark property');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    }
  });
  const removeMutation = useMutation({
    mutationFn: (id: string) =>
      api<{ id: string }> (`/api/watchlist/${id}`, { method: 'DELETE' }),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['watchlist'], (old: WatchlistItem[] = []) =>
        old.filter(item => item.id !== id)
      );
      toast.info('Removed from watchlist');
    },
    onError: () => {
      toast.error('Failed to remove from watchlist');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    }
  });
  const toggleWatchlist = (item: { id: string; building: string; departmentId: string; type: string }) => {
    const exists = watchlist.find(i => i.id === item.id);
    if (exists) {
      removeMutation.mutate(item.id);
    } else {
      addMutation.mutate(item);
    }
  };
  const isBookmarked = (id: string) => watchlist.some(item => item.id === id);
  return {
    watchlist,
    isLoading,
    toggleWatchlist,
    isBookmarked,
    isProcessing: addMutation.isPending || removeMutation.isPending
  };
}