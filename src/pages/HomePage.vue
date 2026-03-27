<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Earth, MapPin, Building2, Factory, Briefcase, ArrowRight,
  Sparkles, Database, ShieldCheck, BarChart3, Network
} from 'lucide-vue-next';
import { DEPARTMENTS, MOCK_PROPERTIES } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import { useUiStore } from '@/stores/ui';
const router = useRouter();
const uiStore = useUiStore();
const isAssetDimension = computed(() => uiStore.currentDimension === 'assets');
const iconMap: Record<string, any> = {
  'hong-kong': Earth,
  'kowloon': MapPin,
  'commercial-sales': Building2,
  'sz': Building2,
  'gz': Briefcase,
  'industrial': Factory,
};
const assetHubs = [
  {
    id: 'registry',
    name: 'Portfolio Registry',
    description: 'Unified cross-sector asset database with deep-link navigation and geospatial indexing.',
    icon: Database,
    count: '4.2K+'
  },
  {
    id: 'valuation',
    name: 'Valuation Audit',
    description: 'Historical yield analysis, market appraisals, and institutional-grade valuation feeds.',
    icon: BarChart3,
    count: '1.8K+'
  },
  {
    id: 'contacts',
    name: 'Contact Network',
    description: 'Stakeholder relationship intelligence, tenancy records, and ownership governance maps.',
    icon: Network,
    count: '500+'
  },
];
const getAssetCount = (id: string) => MOCK_PROPERTIES[id]?.length || 0;
const totalAssetsCount = computed(() => {
  return Object.values(MOCK_PROPERTIES).flat().length;
});
const handleAssetHubClick = (tabId: string) => {
  uiStore.navigateToAssetTab(tabId);
  router.push('/assets');
};
</script>
<template>
  <AppLayout>
    <div class="min-h-full pb-20 overflow-x-hidden">
      <div class="py-12 md:py-24 px-6">
        <!-- Hero Section -->
        <div class="max-w-4xl mx-auto text-center mb-16 animate-fade-in relative">
          <div class="absolute inset-0 -z-10 bg-primary/5 blur-[120px] rounded-full scale-150 opacity-60"></div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8 border border-primary/20 backdrop-blur-md">
            <Sparkles class="h-3 w-3 animate-pulse" />
            Terminal Mode: {{ isAssetDimension ? 'Global Intelligence' : 'Sector Explorer' }}
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Insight
          </h1>
          <p class="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {{ isAssetDimension ? 'Aggregate cross-sector data for high-level portfolio oversight.' : 'Deep-dive into specific market sectors and regional developments.' }}
          </p>
        </div>
        <!-- Terminal Content Grid -->
        <div class="max-w-7xl mx-auto relative min-h-[400px]">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-8 scale-95"
          >
            <!-- Asset Intelligence Hub (3-Card Layout) -->
            <div v-if="isAssetDimension" key="asset-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                v-for="hub in assetHubs"
                :key="hub.id"
                @click="handleAssetHubClick(hub.id)"
                class="group relative bg-card border-2 border-transparent hover:border-primary/20 rounded-[2.5rem] p-10 shadow-soft hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
              >
                <div class="absolute top-8 right-8 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                  {{ hub.count }} Records
                </div>
                <div class="flex flex-col h-full relative z-10">
                  <div class="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                    <component :is="hub.icon" class="h-10 w-10" />
                  </div>
                  <h3 class="text-3xl font-black tracking-tight mb-4">{{ hub.name }}</h3>
                  <p class="text-muted-foreground text-sm leading-relaxed mb-12 flex-1">
                    {{ hub.description }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 transition-all duration-500"></div>
                    <div class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 transition-all">
                      Access Hub <ArrowRight class="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Department Sector Grid (6-Card Layout) -->
            <div v-else key="dept-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="dept in DEPARTMENTS"
                :key="dept.id"
                @click="router.push(`/department/${dept.id}`)"
                class="group relative bg-card border rounded-[2.5rem] p-8 shadow-soft hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]"
              >
                <div class="absolute top-6 right-6 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 border border-transparent group-hover:border-primary/20 group-hover:text-primary transition-all">
                  {{ getAssetCount(dept.id) }} Assets
                </div>
                <div class="flex flex-col h-full relative z-10">
                  <div class="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                    <component :is="iconMap[dept.id] || Briefcase" class="h-7 w-7" />
                  </div>
                  <h3 class="text-2xl font-black tracking-tight mb-3">{{ dept.name }}</h3>
                  <p class="text-muted-foreground text-sm leading-relaxed mb-10 flex-1">
                    {{ dept.description }}
                  </p>
                  <div class="flex items-center justify-end">
                    <div class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-4">
                      Explore Sector <ArrowRight class="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <!-- Global Aggregate Baseline (Bottom Stats) -->
        <div class="max-w-7xl mx-auto mt-24 pt-12 border-t grid grid-cols-2 md:grid-cols-4 gap-12 text-center animate-fade-in" style="animation-delay: 0.3s">
          <div class="space-y-1">
            <div class="text-4xl font-black tracking-tighter">{{ totalAssetsCount }}+</div>
            <div class="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">Managed Assets</div>
          </div>
          <div class="space-y-1">
            <div class="text-4xl font-black tracking-tighter">12.4M</div>
            <div class="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">SQFT Indexed</div>
          </div>
          <div class="space-y-1">
            <div class="text-4xl font-black tracking-tighter">$15B+</div>
            <div class="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">Portfolio Value</div>
          </div>
          <div class="space-y-1">
            <div class="text-4xl font-black tracking-tighter">100%</div>
            <div class="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">GBA Coverage</div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<style scoped>
.text-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>