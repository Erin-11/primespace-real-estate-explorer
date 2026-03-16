<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import DepartmentStats from '@/components/DepartmentStats.vue';
import DataTable from '@/components/DataTable.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  setTimeout(() => isLoading.value = false, 400);
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
    <div v-if="department" class="space-y-10">
      <div class="mb-10 text-left">
        <p class="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-2">Institutional Intelligence / Vue 3</p>
        <h1 class="text-4xl md:text-5xl font-black tracking-tighter">{{ department.name }} <span class="text-muted-foreground/20">/</span> Explorer</h1>
      </div>
      <DepartmentStats 
        :properties="properties" 
        :land-supply="landSupply" 
        :valuations="valuations" 
      />
      <Tabs default-value="properties" class="space-y-8">
        <TabsList class="bg-secondary/60 p-1 h-auto rounded-lg inline-flex">
          <TabsTrigger value="properties" class="py-2 px-8 text-xs font-bold uppercase tracking-widest">Properties</TabsTrigger>
          <TabsTrigger value="land" class="py-2 px-8 text-xs font-bold uppercase tracking-widest">Land Supply</TabsTrigger>
          <TabsTrigger v-if="showValuation" value="valuation" class="py-2 px-8 text-xs font-bold uppercase tracking-widest">Valuation</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <DataTable :data="properties" :columns="propertyCols" type="property" />
        </TabsContent>
        <TabsContent value="land">
          <DataTable :data="landSupply" :columns="landCols" type="land" />
        </TabsContent>
        <TabsContent v-if="showValuation" value="valuation">
          <DataTable :data="valuations" :columns="valuationCols" type="valuation" />
        </TabsContent>
      </Tabs>
    </div>
  </AppLayout>
</template>