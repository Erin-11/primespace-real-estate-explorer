<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { Building2, Layers, BarChart3, ArrowUpRight } from 'lucide-vue-next';
const props = defineProps<{
  properties: any[];
  valuations: any[];
}>();
const displayCount = ref(0);
const displayArea = ref(0);
const displayAvg = ref(0);
// Animation frames tracking for cancellation
let activeFrames: number[] = [];
const parseArea = (areaStr: any): number => {
  if (!areaStr) return 0;
  const str = String(areaStr).toLowerCase().replace(/,/g, '');
  const match = str.match(/[\d.]+/);
  if (!match) return 0;
  let val = parseFloat(match[0]);
  // High-precision conversion for institutional reporting
  if (str.includes('sqm')) return val * 10.7639104;
  return val;
};
const targetCount = computed(() => (props.properties?.length || 0) + (props.valuations?.length || 0));
const targetArea = computed(() => {
  const pA = (props.properties || []).reduce((a, b) => a + parseArea(b.area), 0);
  const vA = (props.valuations || []).reduce((a, b) => a + parseArea(b.area), 0);
  return Math.round(pA + vA);
});
const targetAvg = computed(() => targetCount.value > 0 ? Math.round(targetArea.value / targetCount.value) : 0);
function animateValue(current: { value: number }, target: number, duration: number = 600) {
  const start = current.value;
  const startTime = performance.now();
  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    current.value = Math.floor(start + (target - start) * easeOutQuart);
    if (progress < 1) {
      const frameId = requestAnimationFrame(update);
      activeFrames.push(frameId);
    }
  }
  const initialFrame = requestAnimationFrame(update);
  activeFrames.push(initialFrame);
}
const cancelAnimations = () => {
  activeFrames.forEach(cancelAnimationFrame);
  activeFrames = [];
};
watch(targetCount, (newVal) => {
  cancelAnimations();
  animateValue(displayCount, newVal);
});
watch(targetArea, (newVal) => animateValue(displayArea, newVal));
watch(targetAvg, (newVal) => animateValue(displayAvg, newVal));
onMounted(() => {
  animateValue(displayCount, targetCount.value);
  animateValue(displayArea, targetArea.value);
  animateValue(displayAvg, targetAvg.value);
});
onUnmounted(() => {
  cancelAnimations();
});
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <!-- Managed Inventory -->
    <div class="group relative bg-card border rounded-3xl p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
        <Building2 class="h-32 w-32" />
      </div>
      <div class="flex items-start justify-between mb-8">
        <div class="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Building2 class="h-7 w-7" />
        </div>
        <ArrowUpRight class="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
      </div>
      <div class="space-y-1">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Managed Inventory</div>
        <div class="text-4xl font-black tracking-tighter">{{ displayCount.toLocaleString() }}</div>
        <div class="pt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-green-600">
          <div class="h-1 w-1 rounded-full bg-green-600"></div> Validated Assets
        </div>
      </div>
    </div>
    <!-- Spatial Mass -->
    <div class="group relative bg-card border rounded-3xl p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
        <Layers class="h-32 w-32" />
      </div>
      <div class="flex items-start justify-between mb-8">
        <div class="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
          <Layers class="h-7 w-7" />
        </div>
        <ArrowUpRight class="h-5 w-5 text-muted-foreground/30 group-hover:text-emerald-500 transition-colors" />
      </div>
      <div class="space-y-1">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Total Spatial Mass</div>
        <div class="text-4xl font-black tracking-tighter">
          {{ displayArea.toLocaleString() }} <span class="text-sm font-light text-muted-foreground opacity-60">SQFT</span>
        </div>
        <div class="pt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-primary">
          <div class="h-1 w-1 rounded-full bg-primary"></div> GBA Integrated Coverage
        </div>
      </div>
    </div>
    <!-- Efficiency -->
    <div class="group relative bg-card border rounded-3xl p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
        <BarChart3 class="h-32 w-32" />
      </div>
      <div class="flex items-start justify-between mb-8">
        <div class="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
          <BarChart3 class="h-7 w-7" />
        </div>
        <ArrowUpRight class="h-5 w-5 text-muted-foreground/30 group-hover:text-amber-500 transition-colors" />
      </div>
      <div class="space-y-1">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Transactional Density</div>
        <div class="text-4xl font-black tracking-tighter">
          {{ displayAvg.toLocaleString() }} <span class="text-sm font-light text-muted-foreground opacity-60">SQFT</span>
        </div>
        <div class="pt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-amber-600">
          <div class="h-1 w-1 rounded-full bg-amber-600"></div> Unit Avg. Baseline
        </div>
      </div>
    </div>
  </div>
</template>