<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { useDataTable } from '@/composables/useDataTable';
import { useWatchlistStore } from '@/stores/watchlist';
import { useRoute } from 'vue-router';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { ArrowUpDown, ArrowUp, ArrowDown, Star, MapPin, Copy } from 'lucide-vue-next';
import { toast } from 'sonner';
const props = defineProps<{
  data: any[];
  columns: { key: string; label: string; width: string }[];
  type: 'property' | 'land' | 'valuation';
}>();
const { data } = toRefs(props);
const route = useRoute();
const watchlistStore = useWatchlistStore();
const { processedData, filters, sort, setFilter, toggleSort } = useDataTable(data, props.columns[0].key);
const selectedAddress = ref<string | null>(null);
const handleAction = (item: any) => {
  const address = item.building || item.address || item.projectName;
  selectedAddress.value = address;
};
const toggleBookmark = (item: any) => {
  watchlistStore.toggleBookmark({
    id: item.id,
    building: item.building || item.projectName || item.address,
    departmentId: route.params.id as string,
    type: item.type || 'Standard',
  });
};
const copyInfo = (item: any) => {
  const text = `${item.building || item.projectName || item.address}`;
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard');
};
</script>
<template>
  <div class="space-y-4 text-left">
    <Card class="border-border shadow-soft overflow-hidden bg-card/50 backdrop-blur-md">
      <div class="overflow-auto max-h-[calc(100vh-450px)] relative">
        <Table class="min-w-[1200px]">
          <TableHeader class="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b">
            <TableRow>
              <TableHead v-for="col in columns" :key="col.key" :class="['p-0 h-12', col.width]">
                <button 
                  @click="toggleSort(col.key)"
                  class="flex items-center w-full h-full px-4 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ col.label }}
                  <span class="ml-2">
                    <ArrowUp v-if="sort.key === col.key && sort.direction === 'asc'" class="h-3 w-3" />
                    <ArrowDown v-else-if="sort.key === col.key && sort.direction === 'desc'" class="h-3 w-3" />
                    <ArrowUpDown v-else class="h-3 w-3 opacity-20" />
                  </span>
                </button>
              </TableHead>
              <TableHead class="w-[140px] p-0 font-black text-[10px] uppercase tracking-[0.2em] px-4">Actions</TableHead>
            </TableRow>
            <TableRow class="hover:bg-transparent bg-background/50 border-b">
              <TableCell v-for="col in columns" :key="col.key" class="p-2">
                <Input 
                  :placeholder="`Filter ${col.label}...`" 
                  class="h-8 text-xs bg-secondary/40" 
                  :value="filters[col.key]"
                  @input="(e: any) => setFilter(col.key, e.target.value)"
                />
              </TableCell>
              <TableCell class="p-2" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in processedData" :key="item.id" class="group hover:bg-accent/30 border-b border-border/40 transition-colors">
              <TableCell v-for="col in columns" :key="col.key" class="px-4 py-3 text-sm font-medium">
                {{ item[col.key] }}
              </TableCell>
              <TableCell class="px-4 py-3">
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    v-if="type === 'property'"
                    size="icon" variant="ghost" class="h-8 w-8" 
                    :class="watchlistStore.isBookmarked(item.id) ? 'text-amber-500' : 'text-muted-foreground'"
                    @click="toggleBookmark(item)"
                  >
                    <Star class="h-4 w-4" :class="watchlistStore.isBookmarked(item.id) && 'fill-current'" />
                  </Button>
                  <Button size="icon" variant="ghost" class="h-8 w-8 text-primary" @click="handleAction(item)">
                    <MapPin class="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" class="h-8 w-8" @click="copyInfo(item)">
                    <Copy class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
    <MapModal :address="selectedAddress || ''" :is-open="!!selectedAddress" @on-close="selectedAddress = null" />
  </div>
</template>