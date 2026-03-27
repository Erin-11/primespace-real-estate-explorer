<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  LayoutDashboard, Earth, MapPin, Building2, Factory,
  ChevronLeft, ChevronRight, Briefcase, Globe, BarChart3, Network
} from 'lucide-vue-next';
import { useUiStore } from '@/stores/ui';
import { DEPARTMENTS } from '@shared/mock-data';
import { cn } from '@/lib/utils';
const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const iconMap: Record<string, any> = {
  'hong-kong': Earth,
  'kowloon': MapPin,
  'commercial-sales': Building2,
  'sz': Building2,
  'gz': Briefcase,
  'industrial': Factory,
};
const handleAssetTabChange = (tab: string) => {
  uiStore.setActiveAssetTab(tab);
  if (route.path !== '/assets') {
    router.push('/assets');
  }
};
</script>
<template>
  <aside
    :class="cn(
      'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300 flex flex-col shadow-xl md:shadow-none',
      uiStore.isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0',
      !uiStore.isSidebarOpen && 'md:w-20'
    )"
  >
    <div class="flex h-16 items-center px-6 border-b shrink-0">
      <router-link to="/" class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase class="h-5 w-5 text-primary" />
        </div>
        <span v-if="uiStore.isSidebarOpen" class="font-bold text-lg tracking-tight truncate">Insight</span>
      </router-link>
    </div>
    <div class="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
      <nav class="space-y-1">
        <router-link
          to="/"
          :class="cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group',
            route.path === '/' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )"
        >
          <LayoutDashboard class="h-5 w-5 shrink-0" />
          <span v-if="uiStore.isSidebarOpen" class="text-sm font-medium">Home Terminal</span>
        </router-link>
      </nav>
      <!-- Perspective-Based Navigation -->
      <Transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-x-2" enter-to-class="opacity-100 translate-x-0">
        <div v-if="uiStore.currentDimension === 'department'" :key="'dept-nav'" class="space-y-2">
          <p v-if="uiStore.isSidebarOpen" class="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
            Market Sectors
          </p>
          <nav class="space-y-1">
            <router-link
              v-for="dept in DEPARTMENTS"
              :key="dept.id"
              :to="`/department/${dept.id}`"
              :class="cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group',
                route.params.id === dept.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )"
            >
              <component :is="iconMap[dept.id] || Briefcase" class="h-5 w-5 shrink-0" />
              <span v-if="uiStore.isSidebarOpen" class="text-sm font-medium truncate">{{ dept.name }}</span>
            </router-link>
          </nav>
        </div>
        <div v-else :key="'asset-nav'" class="space-y-2">
          <p v-if="uiStore.isSidebarOpen" class="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
            Asset Intelligence
          </p>
          <nav class="space-y-1">
            <button
              @click="handleAssetTabChange('registry')"
              :class="cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group',
                route.path === '/assets' && uiStore.activeAssetTab === 'registry' ? 'bg-blue-500/10 text-blue-600' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )"
            >
              <Globe class="h-5 w-5 shrink-0" />
              <span v-if="uiStore.isSidebarOpen" class="text-sm font-medium truncate">Portfolio Registry</span>
            </button>
            <button
              @click="handleAssetTabChange('valuation')"
              :class="cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group',
                route.path === '/assets' && uiStore.activeAssetTab === 'valuation' ? 'bg-amber-500/10 text-amber-600' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )"
            >
              <BarChart3 class="h-5 w-5 shrink-0" />
              <span v-if="uiStore.isSidebarOpen" class="text-sm font-medium truncate">Valuation Audit</span>
            </button>
            <button
              @click="handleAssetTabChange('contacts')"
              :class="cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group',
                route.path === '/assets' && uiStore.activeAssetTab === 'contacts' ? 'bg-purple-500/10 text-purple-600' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )"
            >
              <Network class="h-5 w-5 shrink-0" />
              <span v-if="uiStore.isSidebarOpen" class="text-sm font-medium truncate">Contact Network</span>
            </button>
          </nav>
        </div>
      </Transition>
    </div>
    <div class="p-4 border-t mt-auto shrink-0 bg-card">
      <button
        @click="uiStore.toggleSidebar()"
        class="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <component :is="uiStore.isSidebarOpen ? ChevronLeft : ChevronRight" class="h-5 w-5" />
      </button>
    </div>
  </aside>
</template>