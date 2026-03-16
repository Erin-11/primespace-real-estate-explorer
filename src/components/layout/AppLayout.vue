<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
defineProps<{
  container?: boolean;
}>();
</script>
<template>
  <SidebarProvider :default-open="false">
    <AppSidebar />
    <SidebarInset>
      <div class="absolute left-2 top-2 z-20">
        <SidebarTrigger />
      </div>
      <ThemeToggle />
      <div :class="[container ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12' : '']">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>