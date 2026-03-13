<script setup lang="ts">
import { ref, provide, watch } from 'vue';
const props = defineProps<{
  defaultValue: string;
  class?: string;
}>();
const activeTab = ref(props.defaultValue);
watch(() => props.defaultValue, (val) => {
  activeTab.value = val;
});
provide('activeTab', activeTab);
provide('setActiveTab', (val: string) => {
  activeTab.value = val;
});
</script>
<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
<script lang="ts">
import { inject, computed } from 'vue';
import { cn } from '@/lib/utils';
export const TabsList = {
  props: ['class'],
  template: `<div :class="cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', $props.class)"><slot /></div>`
};
export const TabsTrigger = {
  props: ['value', 'class'],
  setup(props: any) {
    const activeTab = inject('activeTab') as any;
    const setActiveTab = inject('setActiveTab') as any;
    const isActive = computed(() => activeTab.value === props.value);
    return { isActive, setActiveTab, cn };
  },
  template: `
    <button
      type="button"
      @click="setActiveTab(value)"
      :class="cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50',
        $props.class
      )"
    >
      <slot />
    </button>
  `
};
export const TabsContent = {
  props: ['value', 'class'],
  setup(props: any) {
    const activeTab = inject('activeTab') as any;
    const isActive = computed(() => activeTab.value === props.value);
    return { isActive, cn };
  },
  template: `
    <div v-if="isActive" :class="cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', $props.class)">
      <slot />
    </div>
  `
};
</script>