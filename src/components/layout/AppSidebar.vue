<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { DEPARTMENTS } from '@shared/mock-data';
import { useWatchlistStore } from '@/stores/watchlist';
import { useUiStore } from '@/stores/ui';
import {
  Building2, Landmark, Factory, MapPin, Globe, Briefcase,
  ChevronRight, BarChart3, Star, Sidebar as SidebarIcon
} from 'lucide-vue-next';
const route = useRoute();
const watchlistStore = useWatchlistStore();
const uiStore = useUiStore();
const iconMap: Record<string, any> = {
  'hong-kong': Globe,
  'kowloon': MapPin,
  'commercial-sales': Landmark,
  'sz': Building2,
  'gz': Building2,
  'industrial': Factory,
};
onMounted(() => {
  watchlistStore.fetchWatchlist();
});
</script>
<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 bg-background border-r border-border/50 transition-all duration-300 ease-in-out flex flex-col',
      uiStore.isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0 md:w-16'
    ]"
  >
    <!-- Header -->
    <div class="h-16 flex items-center px-4 border-b border-border/40 shrink-0 overflow-hidden">
      <router-link to="/" class="flex items-center gap-3 min-w-[200px]">
        <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-glow shrink-0">
          <BarChart3 class="h-4 w-4" />
        </div>
        <div v-if="uiStore.isSidebarOpen" class="flex flex-col text-left animate-in fade-in duration-500">
          <span class="text-xs font-black tracking-tighter uppercase">PrimeSpace</span>
          <span class="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Intelligence</span>
        </div>
      </router-link>
    </div>
    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto py-6 custom-scrollbar">
      <div class="px-3 mb-6">
        <p v-if="uiStore.isSidebarOpen" class="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 text-left">
          Regional Units
        </p>
        <div class="space-y-1">
          <router-link
            v-for="dept in DEPARTMENTS"
            :key="dept.id"
            :to="`/department/${dept.id}`"
            :class="[
              'flex items-center gap-3 px-3 h-10 rounded-lg transition-all duration-200 group relative pointer-events-auto',
              route.params.id === dept.id ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            ]"
          >
            <component :is="iconMap[dept.id] || Briefcase" :class="['h-4 w-4 shrink-0', route.params.id === dept.id ? 'text-primary' : '']" />
            <span v-if="uiStore.isSidebarOpen" class="text-xs font-bold tracking-tight truncate flex-1">{{ dept.name }}</span>
            <ChevronRight v-if="uiStore.isSidebarOpen" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </router-link>
        </div>
      </div>
      <!-- Watchlist -->
      <div v-if="watchlistStore.watchlist.length > 0" class="px-3">
        <div v-if="uiStore.isSidebarOpen" class="px-3 mb-4 flex items-center justify-between animate-in fade-in">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 text-left">
            Bookmarks
          </p>
          <span class="text-[9px] font-black px-1.5 py-0.5 bg-secondary rounded-full">{{ watchlistStore.watchlist.length }}</span>
        </div>
        <div class="space-y-1">
          <router-link
            v-for="item in watchlistStore.watchlist.slice(0, 8)"
            :key="item.id"
            :to="`/department/${item.departmentId}`"
            class="flex items-center gap-3 px-3 h-9 rounded-lg text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all pointer-events-auto"
          >
            <Star class="h-3 w-3 text-amber-500 shrink-0" :class="watchlistStore.isBookmarked(item.id) ? 'fill-amber-500' : ''" />
            <span v-if="uiStore.isSidebarOpen" class="text-[11px] font-medium truncate flex-1">{{ item.building }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Toggle & Footer -->
    <div class="p-4 border-t border-border/40">
      <button
        @click="uiStore.toggleSidebar()"
        class="w-full flex items-center justify-center h-10 rounded-lg hover:bg-secondary transition-colors group"
      >
        <SidebarIcon :class="['h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform', uiStore.isSidebarOpen ? '' : 'rotate-180']" />
      </button>
      <div v-if="uiStore.isSidebarOpen" class="mt-4 flex flex-col gap-1 text-left px-2 animate-in slide-in-from-bottom-1">
        <p class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Terminal v2.1 (Vue)</p>
      </div>
    </div>
  </aside>
  <!-- Overlay for mobile -->
  <div 
    v-if="uiStore.isSidebarOpen" 
    class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-[1px] z-30" 
    @click="uiStore.setSidebar(false)"
  ></div>
</template>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.05);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.05);
}
</style>