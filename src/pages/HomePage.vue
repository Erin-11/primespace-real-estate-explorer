<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Building2, Landmark, Factory, MapPin, Globe, Briefcase, ArrowRight } from 'lucide-vue-next';
import { DEPARTMENTS } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
const router = useRouter();
const iconMap: Record<string, any> = {
  'hong-kong': Globe,
  'kowloon': MapPin,
  'commercial-sales': Landmark,
  'sz': Building2,
  'gz': Building2,
  'industrial': Factory,
};
</script>
<template>
  <AppLayout>
    <div class="relative min-h-screen flex flex-col overflow-hidden">
      <div class="absolute inset-0 bg-gradient-mesh opacity-[0.05] dark:opacity-[0.1] pointer-events-none" />
      <main class="flex-1 flex flex-col items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest animate-fade-in">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Vue Intelligence Engine
            </div>
            <h1 class="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.9]">
              Prime<span class="text-gradient">Space</span>
            </h1>
            <p class="text-body max-w-2xl mx-auto text-xl md:text-2xl font-medium tracking-tight opacity-80">
              Institutional-grade property exploration. <br class="hidden sm:block" />
              Powered by pure Vue 3 high-performance edge.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 w-full">
            <div
              v-for="dept in DEPARTMENTS"
              :key="dept.id"
              class="group cursor-pointer h-full"
              @click="router.push(`/department/${dept.id}`)"
            >
              <Card class="h-full border-muted/50 bg-card/50 backdrop-blur-sm group-hover:border-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500 overflow-hidden relative text-left">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader class="p-8">
                  <div class="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-primary mb-6 transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                    <component :is="iconMap[dept.id] || Briefcase" class="w-7 h-7" />
                  </div>
                  <CardTitle class="text-2xl font-bold tracking-tight mb-3 flex items-center justify-between">
                    {{ dept.name }}
                    <ArrowRight class="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </CardTitle>
                  <CardDescription class="text-base leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                    {{ dept.description }}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  </AppLayout>
</template>