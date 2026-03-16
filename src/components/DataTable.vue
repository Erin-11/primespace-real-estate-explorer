<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { useDataTable } from '@/composables/useDataTable';
import { useWatchlistStore } from '@/stores/watchlist';
import { useRoute } from 'vue-router';
import { ArrowUpDown, ArrowUp, ArrowDown, Star, MapPin, Copy, Search, Filter } from 'lucide-vue-next';
import { toast } from 'sonner';
import MapModal from '@/components/MapModal.vue';
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
const handleMap = (item: any) => {
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
  toast.success('Information copied to clipboard');
};
</script>
<template>
  <div class="space-y-4">
    <div class="border border-border rounded-xl shadow-soft overflow-hidden bg-card/40 backdrop-blur-md">
      <div class="overflow-auto max-h-[calc(100vh-420px)] relative">
        <table class="w-full text-left border-collapse min-w-[1200px]">
          <thead class="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
            <tr class="border-b border-border">
              <th v-for="col in columns" :key="col.key" :class="['h-12 px-4', col.width]">
                <button
                  @click="toggleSort(col.key)"
                  class="flex items-center gap-2 w-full h-full font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {{ col.label }}
                  <span class="shrink-0 transition-opacity opacity-40 group-hover:opacity-100">
                    <ArrowUp v-if="sort.key === col.key && sort.direction === 'asc'" class="h-3 w-3 text-primary" />
                    <ArrowDown v-else-if="sort.key === col.key && sort.direction === 'desc'" class="h-3 w-3 text-primary" />
                    <ArrowUpDown v-else class="h-3 w-3" />
                  </span>
                </button>
              </th>
              <th class="w-[140px] px-4 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
            </tr>
            <!-- Filter Row -->
            <tr class="bg-muted/30 border-b border-border">
              <td v-for="col in columns" :key="col.key" class="p-2">
                <div class="relative group">
                  <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  <input
                    type="text"
                    :placeholder="`Filter...`"
                    class="w-full h-8 pl-8 pr-3 text-[11px] bg-background border border-border/50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-medium"
                    :value="filters[col.key]"
                    @input="(e: any) => setFilter(col.key, e.target.value)"
                  />
                </div>
              </td>
              <td class="p-2 flex items-center justify-center h-12 text-muted-foreground/30">
                <Filter class="w-4 h-4" />
              </td>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/40">
            <tr 
              v-for="item in processedData" 
              :key="item.id" 
              class="group hover:bg-primary/[0.02] transition-colors"
            >
              <td v-for="col in columns" :key="col.key" class="px-4 py-3.5 text-xs font-semibold tracking-tight text-foreground/90">
                <span v-if="col.key === 'type' || col.key === 'usage'" class="px-2 py-0.5 bg-secondary text-[9px] font-black uppercase rounded-full border border-border/50">
                   {{ item[col.key] }}
                </span>
                <span v-else>{{ item[col.key] }}</span>
              </td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    v-if="type === 'property'"
                    class="p-1.5 hover:bg-amber-500/10 rounded-md transition-all"
                    :class="watchlistStore.isBookmarked(item.id) ? 'text-amber-500' : 'text-muted-foreground'"
                    @click="toggleBookmark(item)"
                    title="Bookmark"
                  >
                    <Star class="h-4 w-4" :class="watchlistStore.isBookmarked(item.id) ? 'fill-current' : ''" />
                  </button>
                  <button 
                    class="p-1.5 hover:bg-primary/10 text-primary rounded-md transition-all" 
                    @click="handleMap(item)"
                    title="View Map"
                  >
                    <MapPin class="h-4 w-4" />
                  </button>
                  <button 
                    class="p-1.5 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-all" 
                    @click="copyInfo(item)"
                    title="Copy Info"
                  >
                    <Copy class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="processedData.length === 0">
              <td :colspan="columns.length + 1" class="h-48 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                No institutional data matches the current filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <MapModal :address="selectedAddress || ''" :is-open="!!selectedAddress" @on-close="selectedAddress = null" />
  </div>
</template>