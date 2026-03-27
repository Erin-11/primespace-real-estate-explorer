<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Hexagon, Bell, Search, Menu, X, Briefcase, Building2 } from 'lucide-vue-next';
import AppSidebar from './AppSidebar.vue';
import { useUiStore } from '@/stores/ui';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { cn } from '@/lib/utils';
defineProps<{
  container?: boolean;
}>();
const uiStore = useUiStore();
const router = useRouter();
const route = useRoute();
const isSwitching = ref(false);
const resizeTimer = ref<number | null>(null);
const handleResize = () => {
  if (resizeTimer.value) window.clearTimeout(resizeTimer.value);
  resizeTimer.value = window.setTimeout(() => {
    const width = window.innerWidth;
    if (width < 768 && uiStore.isSidebarOpen) {
      uiStore.setSidebar(false);
    }
  }, 150);
};
/**
 * Refined Dimension Switch:
 * 1. Visual haptic feedback (blur/scale)
 * 2. Update global state
 * 3. Immediate redirect to Home Terminal (/) to show relevant Mode cards
 */
const handleDimensionChange = (dim: 'department' | 'assets') => {
  if (uiStore.currentDimension === dim) return;
  // Visual haptic feedback
  isSwitching.value = true;
  // Update state first
  uiStore.setDimension(dim);
  // Forced redirect to Home Terminal as per "Toggle = Jump to Home" requirement
  router.push('/');
  setTimeout(() => {
    isSwitching.value = false;
  }, 400);
};
onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (resizeTimer.value) window.clearTimeout(resizeTimer.value);
});
</script>
<template>
  <div class="flex min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500 font-sans selection:bg-primary/20">
    <AppSidebar />
    <div
      :class="cn(
        'flex-1 flex flex-col min-w-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'pl-0 md:pl-20',
        uiStore.isSidebarOpen && 'md:pl-64'
      )"
    >
      <header class="sticky top-0 z-30 w-full border-b bg-background/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40 transition-all duration-300">
        <div class="flex h-16 items-center justify-between px-4 md:px-8">
          <div class="flex items-center gap-4">
            <button
              @click="uiStore.toggleSidebar()"
              class="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all active:scale-90"
            >
              <component :is="uiStore.isSidebarOpen ? X : Menu" class="h-5 w-5" />
            </button>
            <div class="flex items-center gap-2 shrink-0 group">
              <Hexagon class="h-6 w-6 text-primary group-hover:rotate-180 transition-transform duration-1000" />
              <span class="text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap hidden sm:inline-block">
                Insight
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Dimension Switch Segmented Control -->
            <div class="flex items-center bg-muted/50 rounded-xl p-1 border border-border/50 scale-90 sm:scale-100 origin-right">
              <button
                @click="handleDimensionChange('department')"
                :class="cn(
                  'flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300',
                  uiStore.currentDimension === 'department' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:bg-accent'
                )"
              >
                <Briefcase class="h-3.5 w-3.5 hidden xs:inline" /> Sector
              </button>
              <button
                @click="handleDimensionChange('assets')"
                :class="cn(
                  'flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300',
                  uiStore.currentDimension === 'assets' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:bg-accent'
                )"
              >
                <Building2 class="h-3.5 w-3.5 hidden xs:inline" /> Assets
              </button>
            </div>
            <div class="hidden md:flex items-center gap-2 border-r pr-6 border-border/50 ml-2">
              <button class="p-2.5 text-muted-foreground hover:text-foreground transition-all hover:bg-accent rounded-xl active:scale-95">
                <Search class="h-4 w-4" />
              </button>
              <button class="p-2.5 text-muted-foreground hover:text-foreground transition-all relative hover:bg-accent rounded-xl active:scale-95">
                <Bell class="h-4 w-4" />
                <span class="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background"></span>
              </button>
            </div>
            <ThemeToggle />
            <div class="h-9 w-9 rounded-xl overflow-hidden border border-border/50 ml-1 ring-2 ring-primary/5 bg-muted cursor-pointer hover:ring-primary/20 transition-all shrink-0 active:scale-95 shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Profile" class="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-x-hidden relative">
        <div :class="cn(
          'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          container ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12 lg:py-16' : 'h-full',
          isSwitching && 'scale-[0.98] opacity-80 blur-[2px]'
        )">
          <slot />
        </div>
      </main>
    </div>
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="uiStore.isSidebarOpen" @click="uiStore.setSidebar(false)" class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"></div>
    </Transition>
  </div>
</template>
<style scoped>
.text-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (max-width: 400px) {
  .xs\:inline {
    display: none;
  }
}
</style>