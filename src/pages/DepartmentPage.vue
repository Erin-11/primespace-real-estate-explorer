<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronRight, Globe, Database, Info, Users } from 'lucide-vue-next';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_VALUATION, MOCK_CONTACTS } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import DepartmentStats from '@/components/DepartmentStats.vue';
import DataTable from '@/components/DataTable.vue';
import DataTableSkeleton from '@/components/DataTableSkeleton.vue';
import Tabs from '@/components/ui/Tabs.vue';
const route = useRoute();
const id = computed(() => route.params.id as string);
const department = computed(() => DEPARTMENTS.find(d => d.id === id.value));
const isLoading = ref(true);
const activeTab = ref('properties');
const properties = computed(() => (id.value ? MOCK_PROPERTIES[id.value] : []) || []);
const valuations = computed(() => (id.value ? MOCK_VALUATION[id.value] : []) || []);
const contacts = computed(() => (id.value ? MOCK_CONTACTS[id.value] : []) || []);
const showValuation = computed(() => {
  const targetId = id.value;
  // Valuation tab strictly hidden for HK and Kowloon
  return targetId !== 'hong-kong' && targetId !== 'kowloon';
});
const tabItems = computed(() => [
  { id: 'properties', label: 'Institutional Registry', show: true },
  { id: 'valuation', label: 'Valuation Audit', show: showValuation.value },
  { id: 'contacts', label: 'Relationship Registry', show: true },
]);
let loadingTimer: ReturnType<typeof setTimeout> | null = null;
watch(id, (newId) => {
  if (!newId) return;
  // Reset state atomically to prevent data ghosting
  isLoading.value = true;
  activeTab.value = 'properties';
  if (loadingTimer) clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    isLoading.value = false;
  }, 450);
}, { immediate: true });
onUnmounted(() => {
  if (loadingTimer) clearTimeout(loadingTimer);
});
const propertyHeaders = [
  { title: 'Asset Identifier', key: 'buildingName' },
  { title: 'Floor', key: 'floor' },
  { title: 'Unit', key: 'unit' },
  { title: 'Sector Type', key: 'propertyType' },
  { title: 'Area (SQFT)', key: 'area' },
  { title: 'Status', key: 'availabilityStatus' },
  { title: 'Intelligence Terminal', key: 'actions', align: 'end' as const },
];
const valuationHeaders = [
  { title: 'Geospatial Address', key: 'address' },
  { title: 'Audit Date', key: 'date' },
  { title: 'Property Type', key: 'propertyType' },
  { title: 'Area', key: 'area' },
  { title: 'Valuation Type', key: 'valuationType' },
  { title: 'Valuer', key: 'valuer' },
  { title: 'Actions', key: 'actions', align: 'end' as const },
];
const contactHeaders = [
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Chinese Name', key: 'chineseName' },
  { title: 'Email Address', key: 'email' },
  { title: 'Phone Protocol', key: 'phone1' },
  { title: 'Registry Link', key: 'actions', align: 'end' as const },
];
</script>
<template>
  <AppLayout container>
    <div v-if="department" class="animate-fade-in max-w-full">
      <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-8 border-l-2 border-primary/20 pl-4">
        <router-link to="/" class="hover:text-primary transition-colors flex items-center gap-1.5 group">
          <Globe class="h-3 w-3 group-hover:rotate-180 transition-transform duration-500" /> Global Terminal
        </router-link>
        <ChevronRight class="h-3 w-3 opacity-30" />
        <span class="text-foreground tracking-widest">{{ department.name }} Sector Analysis</span>
      </nav>
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Database class="h-3 w-3" /> Real-Time Intelligence Stream
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            {{ department.name }} <span class="text-gradient">Sector</span>
          </h1>
          <p class="text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed">
            {{ department.description }} Access institutional-grade property registry, valuation auditing, and relationship governance.
          </p>
        </div>
        <div class="hidden lg:flex items-center gap-6 p-5 rounded-2xl bg-muted/5 border border-dashed text-right shadow-sm">
          <div class="space-y-1">
            <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Registry Health</div>
            <div class="text-xs font-black uppercase tracking-widest text-green-600 flex items-center justify-end gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse"></div> Nominal
            </div>
          </div>
          <div class="h-8 w-px bg-border"></div>
          <div class="space-y-1">
            <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Stakeholders</div>
            <div class="text-xs font-black uppercase tracking-widest flex items-center justify-end gap-2">
              <Users class="h-3 w-3" /> {{ contacts.length }} Verified
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading">
        <DataTableSkeleton />
      </div>
      <div v-else class="space-y-12">
        <!-- Force re-render of stats on department change to ensure fresh animations -->
        <DepartmentStats
          :key="`stats-${id}`"
          :properties="properties"
          :valuations="valuations"
        />
        <div class="space-y-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b">
            <Tabs v-model="activeTab" :tabs="tabItems" :defaultValue="'properties'" />
            <div class="flex items-center gap-2 text-muted-foreground/40 pb-4 md:pb-0 px-4">
              <span class="text-[9px] font-black uppercase tracking-widest">Sector-specific intelligence layers</span>
              <span class="h-3.5 w-3.5"><Info class="h-full w-full" /></span>
            </div>
          </div>
          <Transition
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="activeTab === 'properties'" key="properties">
              <DataTable :data="properties" :headers="propertyHeaders" type="property" />
            </div>
            <div v-else-if="activeTab === 'valuation'" key="valuation">
              <DataTable :data="valuations" :headers="valuationHeaders" type="valuation" />
            </div>
            <div v-else-if="activeTab === 'contacts'" key="contacts">
              <DataTable :data="contacts" :headers="contactHeaders" type="contact" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </AppLayout>
</template>