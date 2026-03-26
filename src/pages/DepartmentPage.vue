<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronRight, Globe, Database, Info } from 'lucide-vue-next';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import DepartmentStats from '@/components/DepartmentStats.vue';
import DataTable from '@/components/DataTable.vue';
import Tabs from '@/components/ui/Tabs.vue';
const route = useRoute();
const id = computed(() => route.params.id as string);
const department = computed(() => DEPARTMENTS.find(d => d.id === id.value));
const isLoading = ref(true);
const activeTab = ref('properties');
const properties = computed(() => MOCK_PROPERTIES[id.value] || []);
const landSupply = computed(() => MOCK_LAND_SUPPLY[id.value] || []);
const valuations = computed(() => MOCK_VALUATION[id.value] || []);
const showValuation = computed(() => department.value?.id !== 'hong-kong' && department.value?.id !== 'kowloon');
const tabItems = computed(() => [
  { id: 'properties', label: 'Institutional Registry', show: true },
  { id: 'land', label: 'Land Supply Index', show: true },
  { id: 'valuation', label: 'Valuation Audit', show: showValuation.value },
]);
watch(id, (newId) => {
  if (!newId) return;
  isLoading.value = true;
  activeTab.value = 'properties';
  // Simulate institutional data retrieval with explicit reset
  const timer = setTimeout(() => {
    isLoading.value = false;
  }, 450);
  return () => clearTimeout(timer);
}, { immediate: true });
const propertyHeaders = [
  { title: 'Asset Identifier', key: 'buildingName' },
  { title: 'Floor', key: 'floor' },
  { title: 'Unit', key: 'unit' },
  { title: 'Sector Type', key: 'propertyType' },
  { title: 'Area (SQFT)', key: 'area' },
  { title: 'Status', key: 'availabilityStatus' },
  { title: 'Intelligence Terminal', key: 'actions' },
];
const landHeaders = [
  { title: 'Project Designation', key: 'projectName' },
  { title: 'Geospatial Address', key: 'address' },
  { title: 'Land Usage', key: 'usage' },
  { title: 'Aggregate Area', key: 'area' },
  { title: 'Fiscal Year', key: 'year' },
  { title: 'Management', key: 'actions' },
];
const valuationHeaders = [
  { title: 'Geospatial Address', key: 'address' },
  { title: 'Audit Date', key: 'date' },
  { title: 'Asset Classification', key: 'propertyType' },
  { title: 'Operational Size', key: 'area' },
  { title: 'Certified Valuer', key: 'valuer' },
  { title: 'Actions', key: 'actions' },
];
</script>
<template>
  <AppLayout container>
    <div v-if="department" class="animate-fade-in max-w-full">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">
        <router-link to="/" class="hover:text-primary transition-colors flex items-center gap-1.5">
          <Globe class="h-3 w-3" /> Global Terminal
        </router-link>
        <ChevronRight class="h-3 w-3 opacity-30" />
        <span class="text-foreground tracking-widest">{{ department.name }} Sector Analysis</span>
      </nav>
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Database class="h-3 w-3" /> Real-Time Intelligence Stream
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            {{ department.name }} <span class="text-gradient">Sector</span>
          </h1>
          <p class="text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed">
            {{ department.description }} Access institutional-grade property registry, land supply forecasting, and historical valuation audits.
          </p>
        </div>
        <div class="hidden lg:flex items-center gap-6 p-4 rounded-2xl bg-muted/5 border border-dashed text-right">
          <div class="space-y-1">
            <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Registry Health</div>
            <div class="text-xs font-black uppercase tracking-widest text-green-600 flex items-center justify-end gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse"></div> Nominal
            </div>
          </div>
          <div class="h-8 w-px bg-border"></div>
          <div class="space-y-1">
            <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Last Sync</div>
            <div class="text-xs font-black uppercase tracking-widest">T-{{ new Date().getMinutes() }}m</div>
          </div>
        </div>
      </div>
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="h-40 bg-muted/20 animate-pulse rounded-3xl border"></div>
        </div>
        <div class="h-[600px] bg-muted/10 animate-pulse rounded-3xl border border-dashed flex flex-col items-center justify-center gap-4 text-muted-foreground/30">
           <Database class="h-12 w-12" />
           <span class="text-[10px] font-black uppercase tracking-widest">Hydrating Sector Data Lake...</span>
        </div>
      </div>
      <!-- Main Dashboard Content -->
      <div v-else class="space-y-12">
        <!-- Keyed component to ensure re-animation on sector switch -->
        <DepartmentStats
          :key="`stats-${id}`"
          :properties="properties"
          :land-supply="landSupply"
          :valuations="valuations"
        />
        <div class="space-y-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b">
            <Tabs v-model="activeTab" :tabs="tabItems" />
            <div class="flex items-center gap-2 text-muted-foreground/40 pb-4 md:pb-0 px-4">
              <span class="text-[9px] font-black uppercase tracking-widest">Select terminal view to browse datasets</span>
              <Info class="h-3.5 w-3.5" />
            </div>
          </div>
          <!-- Content Switching with defensive rendering -->
          <div v-if="activeTab === 'properties'" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <DataTable
              v-if="propertyHeaders?.length && properties?.length"
              :data="properties"
              :headers="propertyHeaders"
              type="property"
            />
          </div>
          <div v-if="activeTab === 'land'" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <DataTable
              v-if="landHeaders?.length && landSupply?.length"
              :data="landSupply"
              :headers="landHeaders"
              type="land"
            />
          </div>
          <div v-if="activeTab === 'valuation'" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <DataTable
              v-if="valuationHeaders?.length && valuations?.length"
              :data="valuations"
              :headers="valuationHeaders"
              type="valuation"
            />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>