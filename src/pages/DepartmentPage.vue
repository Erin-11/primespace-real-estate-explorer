<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import DepartmentStats from '@/components/DepartmentStats.vue';
import DataTable from '@/components/DataTable.vue';
import DataTableSkeleton from '@/components/DataTableSkeleton.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
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
  setTimeout(() => {
    isLoading.value = false;
  }, 400);
}, { immediate: true });
const propertyCols = [
  { key: 'buildingName', label: 'Building Name', width: 'w-[250px]' },
  { key: 'floor', label: 'Floor', width: 'w-[100px]' },
  { key: 'unit', label: 'Unit', width: 'w-[100px]' },
  { key: 'zone', label: 'Zone', width: 'w-[120px]' },
  { key: 'district', label: 'District', width: 'w-[150px]' },
  { key: 'street', label: 'Street', width: 'w-[180px]' },
  { key: 'propertyType', label: 'Type', width: 'w-[150px]' },
  { key: 'source', label: 'Source', width: 'w-[150px]' },
  { key: 'area', label: 'Area', width: 'w-[120px]' },
  { key: 'address', label: 'Address', width: 'w-[320px]' },
];
const landCols = [
  { key: 'projectName', label: 'Project Name', width: 'w-[350px]' },
  { key: 'address', label: 'Address', width: 'w-[400px]' },
  { key: 'usage', label: 'Usage', width: 'w-[180px]' },
  { key: 'area', label: 'Area', width: 'w-[150px]' },
  { key: 'year', label: 'Tender Year', width: 'w-[150px]' },
];
const valuationCols = [
  { key: 'address', label: 'Subject Property', width: 'w-[450px]' },
  { key: 'date', label: 'Effective Date', width: 'w-[180px]' },
  { key: 'propertyType', label: 'Asset Type', width: 'w-[180px]' },
  { key: 'area', label: 'Sized GFA', width: 'w-[150px]' },
  { key: 'valuer', label: 'Valuer', width: 'w-[220px]' },
];
</script>
<template>
  <AppLayout container>
    <div v-if="department" class="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div class="mb-10 text-left">
        <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/60 mb-3">
          <span class="hover:text-primary transition-colors cursor-pointer">Global Intelligence</span>
          <span class="opacity-30">/</span>
          <span class="text-primary">{{ department.name }} Region</span>
        </nav>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
          {{ department.name }} <span class="text-primary/10">Explorer</span>
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
          <TabsList class="bg-secondary/50 p-1 rounded-xl h-auto flex flex-wrap gap-1 border border-border/40">
            <TabsTrigger value="properties" class="flex-1 py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Property
            </TabsTrigger>
            <TabsTrigger value="land" class="flex-1 py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Development Land
            </TabsTrigger>
            <TabsTrigger v-if="showValuation" value="valuation" class="flex-1 py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
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
  </AppLayout>
</template>