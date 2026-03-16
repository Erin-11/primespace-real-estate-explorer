<script setup lang="ts">
import { useRoute } from 'vue-router';
import { DEPARTMENTS } from '@shared/mock-data';
import { useWatchlistStore } from '@/stores/watchlist';
import { 
  Building2, Landmark, Factory, MapPin, Globe, Briefcase, 
  ChevronRight, BarChart3, Star, Settings 
} from 'lucide-vue-next';
import { 
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, 
  SidebarHeader, SidebarGroupLabel, SidebarMenu, 
  SidebarMenuItem, SidebarMenuButton 
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { onMounted } from 'vue';
const route = useRoute();
const watchlistStore = useWatchlistStore();
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
  <Sidebar class="border-r border-border/50">
    <SidebarHeader class="p-4 border-b border-border/40">
      <router-link to="/" class="flex items-center gap-3 px-2 group">
        <div class="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-glow group-hover:scale-110 transition-transform duration-300">
          <BarChart3 class="h-5 w-5" />
        </div>
        <div class="flex flex-col text-left">
          <span class="text-sm font-black tracking-tighter">PrimeSpace</span>
          <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Intelligence</span>
        </div>
      </router-link>
    </SidebarHeader>
    <SidebarContent class="py-6 space-y-6">
      <SidebarGroup>
        <SidebarGroupLabel class="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 text-left">
          Regional Departments
        </SidebarGroupLabel>
        <SidebarMenu class="px-3 space-y-1">
          <SidebarMenuItem v-for="dept in DEPARTMENTS" :key="dept.id">
            <SidebarMenuButton 
              as-child 
              :is-active="route.params.id === dept.id"
              class="h-11 rounded-lg transition-all duration-200"
            >
              <router-link :to="`/department/${dept.id}`" class="flex items-center justify-between w-full group/link">
                <div class="flex items-center gap-3">
                  <component :is="iconMap[dept.id] || Briefcase" class="h-4 w-4 shrink-0" />
                  <span class="text-sm tracking-tight">{{ dept.name }}</span>
                </div>
                <ChevronRight class="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <div class="px-6 mb-4 flex items-center justify-between">
          <SidebarGroupLabel class="p-0 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 text-left">
            Institutional Watchlist
          </SidebarGroupLabel>
          <Badge variant="secondary" class="text-[10px] font-black h-5 px-1.5 rounded-full">
            {{ watchlistStore.watchlist.length }}
          </Badge>
        </div>
        <SidebarMenu class="px-3 space-y-1">
          <template v-if="watchlistStore.watchlist.length > 0">
            <SidebarMenuItem v-for="item in watchlistStore.watchlist.slice(0, 5)" :key="item.id">
              <SidebarMenuButton as-child class="h-10 text-muted-foreground hover:text-foreground">
                <router-link :to="`/department/${item.departmentId}`" class="flex items-center gap-3">
                  <Star class="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span class="text-xs font-medium truncate">{{ item.building }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </template>
          <p v-else class="px-6 text-[10px] font-bold text-muted-foreground/40 italic text-left">No bookmarks</p>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class="p-6 border-t border-border/40">
      <div class="flex flex-col gap-1 text-left">
        <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Terminal v2.0.0 (Vue)</p>
        <p class="text-[10px] font-bold text-muted-foreground/30">PrimeSpace Analytics Hub</p>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>