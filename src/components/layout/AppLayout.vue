<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useUiStore } from '@/stores/ui';
import { Menu } from 'lucide-vue-next';
defineProps<{
  container?: boolean;
}>();
const uiStore = useUiStore();
</script>
<template>
  <div class="min-h-screen bg-background transition-colors duration-300">
    <!-- Sidebar Component -->
    <AppSidebar />
    <!-- Main Content Area -->
    <div 
      :class="[
        'transition-all duration-300 ease-in-out min-h-screen relative flex flex-col',
        uiStore.isSidebarOpen ? 'md:pl-64' : 'md:pl-16'
      ]"
    >
      <!-- Top Actions Bar -->
      <header class="h-14 flex items-center justify-between px-4 sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/40">
        <button 
          @click="uiStore.toggleSidebar()"
          class="p-2 hover:bg-secondary rounded-lg transition-colors md:hidden"
        >
          <Menu class="h-5 w-5 text-muted-foreground" />
        </button>
        <div class="flex-1" />
        <ThemeToggle />
      </header>
      <main :class="[container ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 w-full' : 'w-full']">
        <slot />
      </main>
    </div>
  </div>
</template>