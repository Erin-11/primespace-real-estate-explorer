<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MOCK_PROPERTIES } from '@shared/mock-data';
import AppLayout from '@/components/layout/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  ChevronLeft, MapPin, Building2, User, Landmark, Clock,
  Activity, Briefcase, Download, Share2, ShieldCheck, Zap,
  Globe, LayoutGrid, Info, CheckCircle2
} from 'lucide-vue-next';
import { toast } from 'vue-sonner';
const route = useRoute();
const router = useRouter();
const deptId = computed(() => route.params.id as string);
const propId = computed(() => route.params.propertyId as string);
const property = computed(() => {
  const deptProps = MOCK_PROPERTIES[deptId.value] || [];
  return deptProps.find(p => p.id === propId.value);
});
const goBack = () => router.push(`/department/${deptId.value}`);
const exportReport = () => {
  toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
    loading: 'Generating Asset Dossier...',
    success: 'Institutional Report Exported',
    error: 'Export Service Unavailable'
  });
};
const shareAsset = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success('Asset Link Copied', {
    description: 'URL saved to clipboard for internal sharing.'
  });
};
const encodedAddress = computed(() => property.value ? encodeURIComponent(property.value.address) : '');
const scrollToMap = () => {
  const mapSection = document.getElementById('geospatial-analysis');
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
<template>
  <AppLayout container>
    <div v-if="property" class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      <!-- Breadcrumb & Critical Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-all group"
        >
          <ChevronLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Market Intelligence Root
        </button>
        <div class="flex items-center gap-3">
          <button @click="shareAsset" class="h-10 px-4 rounded-xl border border-border bg-background hover:bg-secondary text-xs font-bold flex items-center gap-2 transition-all group active:scale-95">
            <Share2 class="w-3.5 h-3.5 group-hover:text-primary transition-colors" /> Share
          </button>
          <button @click="exportReport" class="h-10 px-5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-2 shadow-primary hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95">
            <Download class="w-3.5 h-3.5" /> Export Dossier
          </button>
        </div>
      </div>
      <!-- Header Identity -->
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
            {{ property.propertyType }} Core Asset
          </span>
          <span class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
            <ShieldCheck class="w-3.5 h-3.5" /> Institutional Grade Verified
          </span>
        </div>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.85] py-2">
          {{ property.buildingName }}
        </h1>
        <button
          @click="scrollToMap"
          class="text-xl md:text-2xl text-muted-foreground hover:text-primary flex items-center gap-3 font-medium tracking-tight transition-colors group"
        >
          <MapPin class="w-6 h-6 text-primary group-hover:animate-bounce" />
          <span class="italic underline decoration-primary/30 underline-offset-8">{{ property.address }}</span>
        </button>
      </div>
      <!-- Section 1: Core Physical Metrics -->
      <div class="space-y-6">
        <div class="flex items-center gap-2 border-b border-border pb-4">
          <LayoutGrid class="w-5 h-5 text-primary" />
          <h2 class="text-sm font-black uppercase tracking-[0.3em]">Core Asset Metrics</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card v-for="(val, label) in {
            'Building': property.buildingName,
            'Floor': property.floor,
            'Unit': property.unit,
            'Zone': property.zone,
            'District': property.district,
            'Street': property.street,
            'Source': property.source,
            'Area': property.area
          }" :key="label" class="bg-card/40 border-border/40 shadow-soft p-5 group hover:border-primary/40 hover:bg-card transition-all duration-300">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 group-hover:text-primary transition-colors">{{ label }}</p>
            <p class="text-sm font-bold tracking-tight text-foreground truncate">{{ val }}</p>
          </Card>
          <Card class="bg-card/40 border-border/40 shadow-soft p-5 flex flex-col justify-between group hover:border-primary/40 transition-colors">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Asset Class</p>
            <span class="inline-flex w-fit px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase rounded-lg border border-primary/20">
              {{ property.propertyType }}
            </span>
          </Card>
        </div>
      </div>
      <!-- Section 2: Institutional Intelligence -->
      <div class="space-y-6">
        <div class="flex items-center gap-2 border-b border-border pb-4">
          <Info class="w-5 h-5 text-indigo-500" />
          <h2 class="text-sm font-black uppercase tracking-[0.3em]">Institutional Intelligence</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card class="bg-indigo-500/[0.02] border-indigo-500/10 shadow-soft overflow-hidden relative group hover:border-indigo-500/40 transition-colors">
            <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
              <User class="w-4 h-4 text-indigo-500" />
              <CardTitle class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Portfolio Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-black tracking-tight">{{ property.agent }}</p>
              <p class="text-xs font-bold text-muted-foreground mt-2 flex items-center gap-2">
                <Zap class="w-3 h-3 text-amber-500" /> {{ property.contacts }}
              </p>
            </CardContent>
          </Card>
          <Card class="bg-emerald-500/[0.02] border-emerald-500/10 shadow-soft overflow-hidden relative hover:border-emerald-500/40 transition-colors">
            <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
              <Briefcase class="w-4 h-4 text-emerald-500" />
              <CardTitle class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Current Tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-black tracking-tight truncate">{{ property.tenant }}</p>
              <p class="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Active Occupier</p>
            </CardContent>
          </Card>
          <Card class="bg-blue-500/[0.02] border-blue-500/10 shadow-soft overflow-hidden relative hover:border-blue-500/40 transition-colors">
            <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
              <Landmark class="w-4 h-4 text-blue-500" />
              <CardTitle class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Landlord</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-black tracking-tight truncate">{{ property.landlord }}</p>
              <p class="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Title Holder</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <!-- Immersive Geospatial Analysis (Bottom) -->
      <div id="geospatial-analysis" class="space-y-6 pt-12">
        <div class="flex items-center justify-between border-b border-border pb-4">
          <div class="flex items-center gap-3">
             <div class="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
               <Globe class="w-5 h-5" />
             </div>
             <div>
               <h2 class="text-sm font-black uppercase tracking-[0.2em]">Spatial Telemetry</h2>
               <p class="text-xs text-muted-foreground font-medium">Real-time asset positioning and neighborhood context</p>
             </div>
          </div>
          <div class="flex gap-2 items-center px-3 py-1 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
            <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Live Feed</span>
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>
        </div>
        <Card class="border-border shadow-2xl rounded-2xl overflow-hidden bg-background relative group">
          <CardContent class="p-0 h-[600px]">
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              style="border:0"
              :src="`https://www.google.com/maps?q=${encodedAddress}&output=embed`"
              allowfullscreen
              loading="lazy"
              class="grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>