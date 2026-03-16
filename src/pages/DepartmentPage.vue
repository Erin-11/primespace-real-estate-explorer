<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import DepartmentStats from '@/components/DepartmentStats.vue';
import DataTable from '@/components/DataTable.vue';
import DataTableSkeleton from '@/components/DataTableSkeleton.vue';
import Tabs, { TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs.vue';
const route = useRoute();
const id = computed(() => route.params.id as string);
const department = computed(() => DEPARTMENTS.find(d => d.id === id.value));
const isLoading = ref(true);
const properties = computed(() => MOCK_PROPERTIES[id.value] || []);
const landSupply = computed(() => MOCK_LAND_SUPPLY[id.value] || []);
const valuations = computed(() => MOCK_VALUATION[id.value] || []);
const showValuation = computed(() => department.value?.id !== 'hong-kong' && department.value?.id !== 'kowloon');
watch(id, () => {
  isLoading.value = true;
  // Simulated hydration delay for visual polish
  setTimeout(() => {
    isLoading.value = false;
  }, 350);
}, { immediate: true });
const propertyCols = [
  { key: 'building', label: 'Building', width: 'w-[280px]' },
  { key: 'type', label: 'Type', width: 'w-[140px]' },
  { key: 'floorUnit', label: 'Unit', width: 'w-[100px]' },
  { key: 'area', label: 'Area', width: 'w-[120px]' },
  { key: 'tenant', label: 'Tenant', width: 'w-[180px]' },
  { key: 'contacts', label: 'Contacts', width: 'w-[220px]' },
];
const landCols = [
  { key: 'projectName', label: 'Project Name', width: 'w-[280px]' },
  { key: 'address', label: 'Address', width: 'w-[320px]' },
  { key: 'usage', label: 'Usage', width: 'w-[140px]' },
  { key: 'area', label: 'Area', width: 'w-[120px]' },
];
const valuationCols = [
  { key: 'address', label: 'Subject Property', width: 'w-[320px]' },
  { key: 'date', label: 'Effective Date', width: 'w-[140px]' },
  { key: 'propertyType', label: 'Asset Type', width: 'w-[140px]' },
  { key: 'valuer', label: 'Valuer', width: 'w-[180px]' },
];
</script>
<template>
  <AppLayout container>
    <div v-if="department" class="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div class="mb-10 text-left">
        <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
          <span>Global Intelligence</span>
          <span class="opacity-30">/</span>
          <span class="text-primary">{{ department.name }} Region</span>
        </nav>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
          {{ department.name }} <span class="text-muted-foreground/10">Explorer</span>
        </h1>
      </div>
      <div v-if="isLoading" class="space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="h-32 bg-muted/40 rounded-xl animate-pulse" />
        </div>
        <DataTableSkeleton />
      </div>
      <div v-else class="space-y-12">
        <DepartmentStats
          :properties="properties"
          :land-supply="landSupply"
          :valuations="valuations"
        />
        <Tabs default-value="properties" class="space-y-10">
          <TabsList class="bg-secondary/50 p-1 rounded-xl h-auto flex flex-wrap gap-1">
            <TabsTrigger value="properties" class="flex-1 py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg">
              Asset Inventory
            </TabsTrigger>
            <TabsTrigger value="land" class="flex-1 py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg">
              Development Land
            </TabsTrigger>
            <TabsTrigger v-if="showValuation" value="valuation" class="flex-1 py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg">
              Valuation Data
            </TabsTrigger>
          </TabsList>
          <TabsContent value="properties" class="mt-0">
            <DataTable :data="properties" :columns="propertyCols" type="property" />
          </TabsContent>
          <TabsContent value="land" class="mt-0">
            <DataTable :data="landSupply" :columns="landCols" type="land" />
          </TabsContent>
          <TabsContent v-if="showValuation" value="valuation" class="mt-0">
            <DataTable :data="valuations" :columns="valuationCols" type="valuation" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 class="text-2xl font-bold mb-2">Department Not Found</h2>
      <router-link to="/" class="text-primary hover:underline font-bold uppercase text-xs tracking-widest">Return to Home</router-link>
    </div>
  </AppLayout>
</template>