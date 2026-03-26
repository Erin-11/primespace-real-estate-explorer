<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  Search, MapPin, ChevronDown, Filter,
  ArrowUpDown, ArrowUp, ArrowDown, Globe
} from 'lucide-vue-next';
import MapModal from '@/components/MapModal.vue';
import { cn } from '@/lib/utils';
interface Header {
  title: string;
  key: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
}
const props = withDefaults(
  defineProps<{
    data?: any[];
    headers?: Header[];
    type: string;
  }>(),
  {
    data: () => [],
    headers: () => []
  }
);
const router = useRouter();
const route = useRoute();
const search = ref('');
const selectedType = ref('All Categories');
const selectedAddress = ref<string | null>(null);
const sortBy = ref<string | null>(null);
const sortDesc = ref(false);
const uniqueTypes = computed(() => {
  const data = props.data || [];
  const types = new Set<string>();
  data.forEach(item => {
    const val = item.propertyType || item.usage || item.valuationType || item.category || item.type;
    if (val) types.add(val);
  });
  return ['All Categories', ...Array.from(types).sort()];
});
const filteredData = computed(() => {
  let data = [...(props.data || [])];
  if (selectedType.value !== 'All Categories') {
    data = data.filter(item =>
      item.propertyType === selectedType.value ||
      item.usage === selectedType.value ||
      item.valuationType === selectedType.value ||
      item.category === selectedType.value ||
      item.type === selectedType.value
    );
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    data = data.filter(item =>
      Object.entries(item).some(([key, val]) => {
        if (['contactRecords', 'id'].includes(key)) return false;
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(q);
      })
    );
  }
  if (sortBy.value) {
    const key = sortBy.value;
    data.sort((a, b) => {
      let valA = a[key] ?? '';
      let valB = b[key] ?? '';
      if (key === 'area' || key === 'valuation') {
        valA = parseFloat(String(valA).replace(/[^\d.]/g, '')) || 0;
        valB = parseFloat(String(valB).replace(/[^\d.]/g, '')) || 0;
      } else {
        valA = valA !== null && valA !== undefined ? String(valA).toLowerCase() : '';
        valB = valB !== null && valB !== undefined ? String(valB).toLowerCase() : '';
      }
      if (valA < valB) return sortDesc.value ? 1 : -1;
      if (valA > valB) return sortDesc.value ? -1 : 1;
      return 0;
    });
  }
  return data;
});
const toggleSort = (key: string) => {
  if (sortBy.value === key) {
    if (sortDesc.value) {
      sortBy.value = null;
      sortDesc.value = false;
    } else {
      sortDesc.value = true;
    }
  } else {
    sortBy.value = key;
    sortDesc.value = false;
  }
};
const handleRowClick = (item: any) => {
  if (props.type === 'contact') return;
  if (!item?.id) return;
  // Prevent row navigation if clicking on a button inside row (handled by stop modifiers usually, but this is a fallback)
  const targetDeptId = item?.departmentId || (route.params.id as string) || 'hong-kong';
  if (props.type === 'property' || (item.buildingName && !item.usage && !item.valuationType)) {
    router.push(`/department/${targetDeptId}/property/${item.id}`);
  } else {
    handleMap(item);
  }
};
const handleMap = (item: any) => {
  const addr = item?.address || item?.buildingName || item?.projectName || item?.building || '';
  if (addr) selectedAddress.value = addr;
};
const getBadgeStyles = (type: string) => {
  const t = type?.toLowerCase() || '';
  if (t.includes('commercial') || t.includes('office')) return 'bg-primary/10 text-primary border-primary/20';
  if (t.includes('retail') || t.includes('shop')) return 'bg-pink-500/10 text-pink-600 border-pink-500/20';
  if (t.includes('industrial') || t.includes('warehouse')) return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20';
  if (t.includes('land') || t.includes('supply')) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
  if (t.includes('valuation') || t.includes('mortgage')) return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
  return 'bg-muted text-muted-foreground border-border';
};
</script>
<template>
  <div v-if="props.headers && props.headers.length > 0" class="w-full bg-card border rounded-2xl overflow-hidden shadow-soft flex flex-col">
    <div class="p-6 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-muted/5">
      <div class="space-y-1">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Intelligence Stream</h3>
        <p class="text-xs text-muted-foreground font-medium">
          {{ filteredData.length }} verified institutional records found
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:max-w-2xl">
        <div class="relative w-full sm:w-64">
          <Filter class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <select
            v-model="selectedType"
            class="w-full pl-10 pr-10 py-2.5 bg-background border rounded-xl text-xs font-bold appearance-none focus:ring-2 focus:ring-primary/20 transition-all outline-none cursor-pointer"
          >
            <option v-for="t in uniqueTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        <div class="relative flex-1 w-full">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            v-model="search"
            type="text"
            placeholder="Search dataset parameters..."
            class="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>
    </div>
    <div class="overflow-x-auto w-full custom-scrollbar bg-card">
      <table class="w-full text-sm text-left border-collapse min-w-[1500px]">
        <thead>
          <tr class="bg-muted/30 border-b">
            <th
              v-for="h in props.headers"
              :key="h.key"
              @click="toggleSort(h.key)"
              :class="cn(
                'px-6 py-5 font-black text-muted-foreground uppercase text-[9px] tracking-[0.15em] cursor-pointer hover:bg-muted/50 transition-colors sticky top-0 bg-muted/30 backdrop-blur-md z-10 border-b',
                h.align === 'end' ? 'text-right' : 'text-left'
              )"
            >
              <div :class="cn('flex items-center gap-2 group', h.align === 'end' && 'justify-end')">
                <span class="group-hover:text-primary transition-colors">{{ h.title }}</span>
                <component
                  :is="sortBy === h.key ? (sortDesc ? ArrowDown : ArrowUp) : ArrowUpDown"
                  :class="cn('h-3 w-3 transition-opacity', sortBy === h.key ? 'opacity-100 text-primary' : 'opacity-20')"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/50">
          <tr
            v-for="item in filteredData"
            :key="`${props.type}-${item?.id}`"
            @click="handleRowClick(item)"
            class="hover:bg-accent/40 transition-colors group cursor-pointer"
          >
            <td v-for="h in props.headers" :key="h.key" :class="cn('px-6 py-5 whitespace-nowrap align-middle', h.align === 'end' && 'text-right')">
              <template v-if="['buildingName', 'building', 'projectName', 'fullName'].includes(h.key)">
                <span class="text-primary font-black group-hover:underline decoration-2 underline-offset-4 truncate max-w-[400px] block transition-all">
                  {{ item[h.key] }}
                </span>
              </template>
              <template v-else-if="h.key === 'chineseName'">
                <span class="text-foreground/60 font-medium font-sans tracking-widest">{{ item[h.key] }}</span>
              </template>
              <template v-else-if="h.key === 'address' || h.key === 'projectName'">
                <button @click.stop="handleMap(item)" class="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group/link text-left">
                  <MapPin class="h-3.5 w-3.5 text-primary/40 group-hover/link:text-primary shrink-0" />
                  <span class="font-medium group-hover/link:underline truncate max-w-[300px] inline-block">{{ item[h.key] }}</span>
                </button>
              </template>
              <template v-else-if="['propertyType', 'usage', 'valuationType', 'category', 'type'].includes(h.key)">
                <span :class="cn('inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border', getBadgeStyles(item[h.key]))">
                  {{ item[h.key] }}
                </span>
              </template>
              <template v-else-if="h.key === 'actions'">
                <div class="flex items-center justify-end gap-3">
                  <button @click.stop="handleMap(item)" class="p-2 bg-background border hover:bg-primary hover:text-white rounded-xl transition-all text-primary shadow-sm active:scale-90"><MapPin class="h-4 w-4" /></button>
                </div>
              </template>
              <template v-else>
                <span class="text-muted-foreground font-black tracking-tight text-[11px] uppercase">{{ item[h.key] ?? 'N/A' }}</span>
              </template>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="props.headers.length" class="px-6 py-24 text-center bg-card">
              <div class="flex flex-col items-center gap-4">
                <div class="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground/30 border border-dashed">
                  <Globe class="h-8 w-8" />
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Zero records identified in global stream</p>
                  <p class="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">Adjust filters to re-initialize search</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="px-8 py-5 border-t flex items-center justify-between bg-muted/10">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5"><div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div><span class="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Protocol Active</span></div>
        <div class="h-3 w-px bg-border"></div>
        <span class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Institutional Grade Registry v5.4</span>
      </div>
      <div class="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Aggregate Count: <span class="text-foreground ml-1">{{ filteredData.length }}</span></div>
    </div>
    <MapModal v-if="selectedAddress" :address="selectedAddress" :is-open="!!selectedAddress" @on-close="selectedAddress = null" />
  </div>
</template>