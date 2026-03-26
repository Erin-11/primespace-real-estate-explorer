<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Database, Sparkles } from 'lucide-vue-next';
import AppLayout from '@/components/layout/AppLayout.vue';
import DataTable from '@/components/DataTable.vue';
import DepartmentStats from '@/components/DepartmentStats.vue';
import Tabs from '@/components/ui/Tabs.vue';
import MarketMomentum from '@/components/MarketMomentum.vue';
import { MOCK_PROPERTIES, MOCK_VALUATION, MOCK_CONTACTS } from '@shared/mock-data';
import { useUiStore } from '@/stores/ui';
const uiStore = useUiStore();
const activeTab = computed({
  get: () => uiStore.activeAssetTab,
  set: (val) => uiStore.setActiveAssetTab(val)
});
const allProperties = computed(() => Object.values(MOCK_PROPERTIES).flat());
const allValuations = computed(() => Object.values(MOCK_VALUATION).flat());
const tabItems = [
  { id: 'registry', label: 'Portfolio Registry Explorer' },
  { id: 'valuation', label: 'Valuation Audit Feed' },
  { id: 'contacts', label: 'Contact Network Intelligence' },
];
const registryHeaders = [
  { title: 'Asset Identifier', key: 'buildingName' },
  { title: 'Sector', key: 'departmentId' },
  { title: 'Classification', key: 'propertyType' },
  { title: 'Area (SQFT)', key: 'area' },
  { title: 'Status', key: 'availabilityStatus' },
  { title: 'Actions', key: 'actions', align: 'end' as const },
];
const valuationHeaders = [
  { title: 'Geospatial Address', key: 'address' },
  { title: 'Sector', key: 'departmentId' },
  { title: 'Audit Date', key: 'date' },
  { title: 'Classification', key: 'propertyType' },
  { title: 'Certified Valuer', key: 'valuer' },
  { title: 'Actions', key: 'actions', align: 'end' as const },
];
const contactHeaders = [
  { title: 'Full Name', key: 'fullName' },
  { title: 'Chinese Name', key: 'chineseName' },
  { title: 'Designation', key: 'role' },
  { title: 'Sector Category', key: 'category' },
  { title: 'Contact Protocol', key: 'actions', align: 'end' as const },
];
const contactData = computed(() => MOCK_CONTACTS.map(c => ({
  ...c,
  fullName: `${c.firstName} ${c.lastName}`
})));
onMounted(() => {
  uiStore.setDimension('assets');
});
</script>
<template>
  <AppLayout container>
    <div class="animate-fade-in space-y-12 pb-20">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Database class="h-3 w-3" /> Global Aggregate Intelligence Terminal
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Assets <span class="text-gradient">Intelligence</span>
          </h1>
          <p class="text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed">
            A unified perspective across <span class="text-foreground font-black">6 sectors</span> and <span class="text-foreground font-black">12.4M SQFT</span> of prime institutional assets.
          </p>
        </div>
        <div class="hidden lg:flex items-center gap-2 px-4 py-2 bg-muted/20 border rounded-2xl">
          <Sparkles class="h-4 w-4 text-primary animate-pulse" />
          <span class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">GBA-Wide Coverage Active</span>
        </div>
      </div>
      <!-- High Fidelity Market Visualization -->
      <MarketMomentum />
      <DepartmentStats
        :properties="allProperties"
        :land-supply="[]"
        :valuations="allValuations"
      />
      <div class="space-y-8">
        <div class="flex items-center justify-between border-b overflow-x-auto no-scrollbar">
          <Tabs v-model="activeTab" :tabs="tabItems" />
        </div>
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          mode="out-in"
        >
          <div v-if="activeTab === 'registry'" :key="'registry'">
            <DataTable
              :data="allProperties"
              :headers="registryHeaders"
              type="property"
            />
          </div>
          <div v-else-if="activeTab === 'valuation'" :key="'valuation'">
            <DataTable
              :data="allValuations"
              :headers="valuationHeaders"
              type="valuation"
            />
          </div>
          <div v-else-if="activeTab === 'contacts'" :key="'contacts'">
            <DataTable
              :data="contactData"
              :headers="contactHeaders"
              type="contact"
            />
          </div>
        </Transition>
      </div>
    </div>
  </AppLayout>
</template>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>