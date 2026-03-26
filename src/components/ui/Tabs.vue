<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';
interface Tab {
  id: string;
  label: string;
  show?: boolean;
}
const props = defineProps<{
  tabs: Tab[];
  modelValue: string;
  defaultValue?: string;
}>();
const emit = defineEmits(['update:modelValue']);
const visibleTabs = computed(() => props.tabs.filter(t => t.show !== false));
const currentActiveId = computed(() => props.modelValue || props.defaultValue || '');
const handleTabClick = (id: string) => {
  if (id === currentActiveId.value) return;
  emit('update:modelValue', id);
};
</script>
<template>
  <div class="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
    <button
      v-for="tab in visibleTabs"
      :key="tab.id"
      type="button"
      @click="handleTabClick(tab.id)"
      :class="cn(
        'px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative whitespace-nowrap outline-none group',
        currentActiveId === tab.id ? 'text-primary' : 'text-muted-foreground/40 hover:text-foreground'
      )"
    >
      <span class="relative z-10 transition-transform duration-300 group-active:scale-95 block">
        {{ tab.label }}
      </span>
      <!-- Persistent Active Line -->
      <div
        v-if="currentActiveId === tab.id"
        class="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full transition-all duration-300 animate-in fade-in slide-in-from-bottom-1"
      ></div>
      <!-- Hover Indicator -->
      <div
        class="absolute bottom-0 left-4 right-4 h-1 bg-primary/10 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity"
        :class="{ 'hidden': currentActiveId === tab.id }"
      ></div>
    </button>
  </div>
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