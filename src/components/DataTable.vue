<script setup lang="ts">
import { toRefs, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDataTable } from '@/composables/useDataTable';
import { useWatchlistStore } from '@/stores/watchlist';
import { toast } from 'vue-sonner';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  MapPin,
  Copy,
  Search,
  Filter,
  ChevronDown,
  ExternalLink
} from 'lucide-vue-next';
import MapModal from '@/components/MapModal.vue';
const props = defineProps<{
  data: any[];
  columns: { key: string; label: string; width: string }[];
  type: 'property' | 'land' | 'valuation';
}>();
const { data } = toRefs(props);
const router = useRouter();
const route = useRoute();
const watchlistStore = useWatchlistStore();
const defaultSortKey = computed(() => props.columns[0]?.key || 'id');
const { processedData, filters, sort, setFilter, toggleSort } = useDataTable(data, defaultSortKey.value);
const selectedAddress = ref<string | null>(null);
const handleMap = (item: any, event: Event) => {
  event.stopPropagation();
  const address = item.address || item.buildingName || item.projectName;
  selectedAddress.value = address;
};
const toggleBookmark = (item: any, event: Event) => {
  event.stopPropagation();
  watchlistStore.toggleBookmark({
    id: item.id,
    building: item.buildingName || item.projectName || item.address,
    departmentId: route.params.id as string,
    type: item.propertyType || 'Standard',
  });
};
const copyInfo = (item: any, event: Event) => {
  event.stopPropagation();
  const text = `${item.buildingName || item.projectName || item.address}`;
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Location copied to clipboard');
  });
};
const navigateToDetails = (item: any) => {
  if (props.type === 'property') {
    router.push(`/department/${route.params.id}/property/${item.id}`);
  }
};
const propertyTypes = ['Commercial', 'Residential', 'Retail', 'Hotel', 'Industrial', 'Other'];
const getAvailabilityClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'available': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'under offer': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'leased': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    default: return 'bg-secondary text-muted-foreground border-border';
  }
};
</script>
<template>
  <div class="space-y-4">
    <div class="border border-border/60 rounded-2xl shadow-soft bg-card/40 backdrop-blur-xl relative group/container overflow-hidden">
      <!-- Horizontal Scroll Area -->
      <div class="overflow-x-auto overflow-y-auto max-h-[calc(100vh-380px)] custom-scrollbar relative">
        <table class="w-full text-left border-collapse min-w-[1500px]">
          <thead class="sticky top-0 z-[30] bg-background/95 backdrop-blur-xl border-b border-border/50">
            <tr>
              <th v-for="col in columns" :key="col.key" :class="['h-14 px-6', col.width]">
                <button
                  @click="toggleSort(col.key)"
                  class="flex items-center gap-2 w-full h-full font-black text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 hover:text-primary transition-colors group"
                >
                  {{ col.label }}
                  <span class="shrink-0 transition-all opacity-0 group-hover:opacity-100 flex items-center">
                    <ArrowUp v-if="sort.key === col.key && sort.direction === 'asc'" class="h-3.5 w-3.5 text-primary" />
                    <ArrowDown v-else-if="sort.key === col.key && sort.direction === 'desc'" class="h-3.5 w-3.5 text-primary" />
                    <ArrowUpDown v-else class="h-3.5 w-3.5 text-muted-foreground/30" />
                  </span>
                </button>
              </th>
              <th class="w-[160px] px-6 text-center font-black text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 sticky right-0 bg-background/95 backdrop-blur-xl border-l border-border/10 shadow-[-12px_0_20px_-5px_rgba(0,0,0,0.05)]">
                Operations
              </th>
            </tr>
            <tr class="bg-muted/30 border-b border-border/40">
              <td v-for="col in columns" :key="col.key" class="p-3">
                <div v-if="col.key === 'propertyType'" class="relative">
                   <select
                    class="w-full h-9 pl-4 pr-10 text-[11px] font-bold bg-background/50 border border-border/40 rounded-xl focus:ring-2 focus:ring-primary/20 appearance-none transition-all cursor-pointer"
                    @change="(e: any) => setFilter(col.key, e.target.value)"
                  >
                    <option value="">Filter Type...</option>
                    <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 pointer-events-none" />
                </div>
                <div v-else class="relative group">
                  <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    :placeholder="`Search ${col.label}...`"
                    class="w-full h-9 pl-10 pr-4 text-[11px] font-bold bg-background/50 border border-border/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    :value="filters[col.key]"
                    @input="(e: any) => setFilter(col.key, e.target.value)"
                  />
                </div>
              </td>
              <td class="p-3 sticky right-0 bg-muted/40 backdrop-blur-xl border-l border-border/10 flex items-center justify-center h-14 opacity-20"><Filter class="w-4 h-4" /></td>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            <tr
              v-for="item in processedData"
              :key="item.id"
              class="group hover:bg-primary/[0.04] transition-all duration-300 cursor-pointer"
              @click="navigateToDetails(item)"
            >
              <td v-for="col in columns" :key="col.key" class="px-6 py-4 text-xs font-bold tracking-tight text-foreground/80 group-hover:text-foreground">
                <span v-if="col.key === 'propertyType' || col.key === 'usage'" class="inline-flex items-center px-2.5 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                   {{ item[col.key] }}
                </span>
                <span v-else-if="col.key === 'availabilityStatus'" :class="['inline-flex items-center px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border', getAvailabilityClass(item[col.key])]">
                   {{ item[col.key] }}
                </span>
                <span v-else-if="col.key === 'buildingName' || col.key === 'projectName'" class="text-primary font-black hover:underline decoration-2 underline-offset-4 flex items-center gap-1.5">
                  {{ item[col.key] }}
                  <ExternalLink v-if="type === 'property'" class="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                </span>
                <span v-else-if="col.key === 'address'" class="hover:text-primary transition-colors italic opacity-70 group-hover:opacity-100">
                  {{ item[col.key] }}
                </span>
                <span v-else>{{ item[col.key] }}</span>
              </td>
              <td class="px-6 py-4 sticky right-0 bg-background/95 backdrop-blur-xl group-hover:bg-primary/[0.04] border-l border-border/10 transition-colors shadow-[-12px_0_20px_-5px_rgba(0,0,0,0.03)]" @click.stop>
                <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <button
                    v-if="type === 'property'"
                    class="h-9 w-9 flex items-center justify-center rounded-xl transition-all border border-transparent hover:border-border hover:bg-background"
                    :class="watchlistStore.isBookmarked(item.id) ? 'text-amber-500' : 'text-muted-foreground/40 hover:text-amber-500'"
                    @click="(e) => toggleBookmark(item, e)"
                    aria-label="Bookmark Asset"
                  >
                    <Star class="h-4.5 w-4.5 transition-all duration-300" :class="watchlistStore.isBookmarked(item.id) ? 'fill-current scale-110' : ''" />
                  </button>
                  <button
                    class="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                    @click="(e) => handleMap(item, e)"
                    aria-label="View Geo-Location"
                  >
                    <MapPin class="h-4.5 w-4.5" />
                  </button>
                  <button
                    class="h-9 w-9 flex items-center justify-center rounded-xl text-muted-foreground/40 hover:text-foreground hover:bg-secondary transition-all"
                    @click="(e) => copyInfo(item, e)"
                    aria-label="Copy Details"
                  >
                    <Copy class="h-4.5 w-4.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Right scroll shadow hint -->
      <div class="absolute top-0 right-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-background/40 to-transparent opacity-0 group-hover/container:opacity-100 transition-opacity md:block hidden" />
    </div>
    <MapModal :address="selectedAddress || ''" :is-open="!!selectedAddress" @on-close="selectedAddress = null" />
  </div>
</template>