<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowLeft, Star, Share2, ClipboardCheck, Phone, Mail,
  MapPin, Layers, DoorOpen, MapPinned, Database, Maximize2,
  TrendingUp, Activity, UserCheck, ShieldCheck, ExternalLink,
  Loader2, Globe2, Briefcase
} from 'lucide-vue-next';
import { MOCK_PROPERTIES, type ContactRecord } from '@shared/mock-data';
import { useUiStore } from '@/stores/ui';
import AppLayout from '@/components/layout/AppLayout.vue';
import ContactModal from '@/components/ContactModal.vue';
import MapModal from '@/components/MapModal.vue';
import { cn } from '@/lib/utils';
const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const deptId = computed(() => route.params.id as string);
const propId = computed(() => route.params.propertyId as string);
const property = computed(() => {
  const deptProps = MOCK_PROPERTIES[deptId.value] || [];
  let found = deptProps.find(p => p.id === propId.value);
  if (!found) {
    for (const sector in MOCK_PROPERTIES) {
      found = MOCK_PROPERTIES[sector].find(p => p.id === propId.value);
      if (found) break;
    }
  }
  return found;
});
const isContactModalOpen = ref(false);
const isMapModalOpen = ref(false);
const isEmbeddedMapLoaded = ref(false);
const modalTitle = ref('');
const activeContacts = ref<ContactRecord[]>([]);
const encodedAddress = computed(() => property.value ? encodeURIComponent(property.value.address) : '');
const goBack = () => {
  if (window.history.length > 2) {
    router.back();
  } else if (deptId.value && deptId.value !== 'unknown') {
    router.push(`/department/${deptId.value}`);
  } else {
    router.push('/');
  }
};
const openContactRegistry = (category: 'Tenant' | 'Landlord') => {
  if (!property.value) return;
  modalTitle.value = `${category} Relationship Registry`;
  activeContacts.value = (property.value.contactRecords || []).filter(c =>
    c.category === category || c.category === 'Legal' || c.category === 'Agency'
  );
  isContactModalOpen.value = true;
};
const triggerAudit = () => {
  uiStore.showSnackbar({
    message: 'Initializing institutional audit protocol for ' + property.value?.buildingName,
    color: 'success'
  });
};
const specs = computed(() => [
  { label: 'Company Name', value: property.value?.companyName, icon: Briefcase },
  { label: 'Floor Level', value: property.value?.floor, icon: Layers },
  { label: 'Unit ID', value: property.value?.unit, icon: DoorOpen },
  { label: 'Zone', value: property.value?.zone, icon: MapPinned },
  { label: 'District', value: property.value?.district, icon: MapPin },
  { label: 'Total Area', value: property.value?.area, icon: Maximize2 },
  { label: 'Source', value: property.value?.source, icon: Database },
]);
const metrics = [
  { label: 'Est. Cap Rate', value: '3.25% - 3.50%', icon: TrendingUp, color: 'text-primary' },
  { label: 'Occupancy', value: '98.2%', icon: Activity, color: 'text-green-600' },
  { label: 'Risk Profile', value: 'Tier-1 Core', icon: ShieldCheck, color: 'text-blue-600' },
];
</script>
<template>
  <AppLayout container>
    <div v-if="property" class="animate-fade-in space-y-8">
      <!-- Top Navigation & Global Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all group"
        >
          <ArrowLeft class="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Return to Market Terminal
        </button>
        <div class="flex items-center gap-2">
          <button class="p-2 rounded-lg border bg-card hover:bg-accent text-muted-foreground transition-colors">
            <Share2 class="h-4 w-4" />
          </button>
        </div>
      </div>
      <!-- Institutional Header -->
      <div class="border-b pb-8">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div class="space-y-4 max-w-4xl">
            <div class="flex items-center gap-3">
              <span class="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                {{ property?.propertyType }}
              </span>
              <span class="px-2 py-0.5 rounded bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-wider">
                {{ property?.availabilityStatus }}
              </span>
            </div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              {{ property?.buildingName }}
            </h1>
            <button
              @click="isMapModalOpen = true"
              class="flex items-center gap-2 text-muted-foreground group/addr hover:text-primary transition-colors text-left"
            >
              <MapPin class="h-5 w-5 text-primary group-hover/addr:scale-110 transition-transform" />
              <span class="text-lg md:text-xl font-bold tracking-tight group-hover/addr:underline underline-offset-4 decoration-2">
                {{ property?.address }}
              </span>
            </button>
          </div>
          <div class="flex flex-col gap-4 min-w-[280px]">
            <button
              @click="triggerAudit"
              class="w-full bg-primary text-primary-foreground py-4 px-8 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <ClipboardCheck class="h-4 w-4" />
              Request Institutional Audit
            </button>
          </div>
        </div>
      </div>
      <!-- Main Layout: 2:1 Institutional Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Left Column: Asset Profile (2/3) -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Secondary Metrics Summary -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="metric in metrics"
              :key="metric.label"
              class="bg-card border rounded-2xl p-5 flex flex-col gap-1 shadow-soft hover:border-primary/20 transition-all group"
            >
              <div :class="cn('flex items-center gap-2', metric.color)">
                <component :is="metric.icon" class="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span class="text-[9px] font-black uppercase tracking-widest">{{ metric.label }}</span>
              </div>
              <div class="text-xl font-black tracking-tighter">{{ metric.value }}</div>
            </div>
          </div>
          <!-- Specifications Card -->
          <div class="bg-card border rounded-2xl overflow-hidden shadow-soft">
            <div class="px-6 py-4 border-b bg-muted/30 flex justify-between items-center">
              <h3 class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Institutional Specifications</h3>
              <div class="flex items-center gap-2 text-[9px] font-black text-green-600 uppercase tracking-widest">
                <div class="h-1 w-1 rounded-full bg-green-600 animate-pulse"></div> Registry Verified
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3">
              <div
                v-for="spec in specs"
                :key="spec.label"
                class="p-6 border-b border-r last:border-r-0 md:[&:nth-child(3n)]:border-r-0 hover:bg-accent/30 transition-colors group"
              >
                <div class="flex items-center gap-2 text-muted-foreground/50 mb-1.5">
                  <component :is="spec.icon" class="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                  <span class="text-[10px] font-black uppercase tracking-wider">{{ spec.label }}</span>
                </div>
                <div class="text-base font-black tracking-tight truncate">{{ spec.value || 'N/A' }}</div>
              </div>
            </div>
          </div>
          <!-- Geospatial Intelligence Terminal -->
          <div class="bg-card border rounded-2xl overflow-hidden shadow-soft flex flex-col h-[500px] relative group/map">
            <div class="px-6 py-4 border-b bg-muted/30 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Globe2 class="h-4 w-4 text-primary" />
                <h3 class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Geospatial Intelligence Terminal</h3>
              </div>
              <button
                @click="isMapModalOpen = true"
                class="text-[9px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1.5"
              >
                Immersive View <ExternalLink class="h-3 w-3" />
              </button>
            </div>
            <div class="flex-1 relative bg-muted/5">
              <div v-if="!isEmbeddedMapLoaded" class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm transition-all duration-500">
                <Loader2 class="h-8 w-8 text-primary animate-spin" />
                <span class="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Synchronizing GIS Coordinates...</span>
              </div>
              <iframe
                v-if="encodedAddress"
                width="100%"
                height="100%"
                frameborder="0"
                style="border:0"
                :src="`https://www.google.com/maps?q=${encodedAddress}&output=embed`"
                allowfullscreen
                loading="lazy"
                @load="isEmbeddedMapLoaded = true"
                class="w-full h-full transition-opacity duration-700"
                :class="isEmbeddedMapLoaded ? 'opacity-100' : 'opacity-0'"
              ></iframe>
            </div>
          </div>
        </div>
        <!-- Right Column: Relationship Intelligence Sidebar (1/3) -->
        <aside class="space-y-6 lg:sticky lg:top-24">
          <!-- Market Representation -->
          <div class="bg-card border rounded-2xl p-6 shadow-soft space-y-6">
            <div class="flex items-center gap-2">
              <UserCheck class="h-4 w-4 text-primary" />
              <h3 class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Market Representation</h3>
            </div>
            <div class="flex flex-col items-center text-center gap-4">
              <div class="h-32 w-32 rounded-3xl overflow-hidden border-4 border-primary/5 ring-4 ring-primary/5 shadow-inner">
                <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${property?.agent || 'default'}`" class="h-full w-full object-cover" />
              </div>
              <div class="space-y-1">
                <h4 class="text-2xl font-black tracking-tighter leading-none">{{ property?.agent }}</h4>
                <p class="text-xs text-muted-foreground font-bold uppercase tracking-wider">Senior Institutional Advisor</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-3">
              <button class="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-primary text-primary text-[10px] font-black uppercase tracking-[0.1em] hover:bg-primary hover:text-white transition-all group">
                <Phone class="h-4 w-4 group-hover:scale-110 transition-transform" /> Call Intelligence
              </button>
              <button class="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-[0.1em] hover:bg-muted transition-all group">
                <Mail class="h-4 w-4 group-hover:scale-110 transition-transform" /> Secure Data Link
              </button>
            </div>
          </div>
          <!-- Tenancy & Governance Registry -->
          <div class="bg-card border rounded-2xl p-6 shadow-soft space-y-6">
            <div class="flex items-center gap-2">
              <ShieldCheck class="h-4 w-4 text-primary" />
              <h3 class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Tenancy & Governance</h3>
            </div>
            <div class="space-y-4">
              <div
                @click="openContactRegistry('Tenant')"
                class="group flex flex-col p-5 rounded-xl bg-muted/20 border border-dashed hover:border-primary/50 hover:bg-primary/[0.02] cursor-pointer transition-all"
              >
                <span class="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-3">Primary Tenant</span>
                <div class="flex justify-between items-center gap-2">
                  <span class="text-base font-black tracking-tight truncate">{{ property?.tenant }}</span>
                  <ExternalLink class="h-4 w-4 text-primary opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </div>
              <div
                @click="openContactRegistry('Landlord')"
                class="group flex flex-col p-5 rounded-xl bg-muted/20 border border-dashed hover:border-primary/50 hover:bg-primary/[0.02] cursor-pointer transition-all"
              >
                <span class="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-3">Asset Owner</span>
                <div class="flex justify-between items-center gap-2">
                  <span class="text-base font-black tracking-tight truncate">{{ property?.landlord }}</span>
                  <ExternalLink class="h-4 w-4 text-primary opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </div>
            </div>
            <p class="text-[9px] font-medium text-muted-foreground/40 text-center uppercase tracking-widest leading-relaxed px-4">
              Access relationship history and legal audit trails for vetted institutional partners.
            </p>
          </div>
        </aside>
      </div>
    </div>
    <!-- Global Loading State -->
    <div v-else class="flex flex-col items-center justify-center py-40 animate-fade-in">
       <Loader2 class="h-12 w-12 text-primary animate-spin mb-4" />
       <p class="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Synchronizing Asset Intelligence Data...</p>
    </div>
    <!-- Modals -->
    <ContactModal
      :is-open="isContactModalOpen"
      :title="modalTitle"
      :contacts="activeContacts"
      @close="isContactModalOpen = false"
    />
    <MapModal
      v-if="property"
      :address="property.address"
      :is-open="isMapModalOpen"
      @on-close="isMapModalOpen = false"
    />
  </AppLayout>
</template>