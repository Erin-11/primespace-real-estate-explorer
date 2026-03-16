<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { Hash, Maximize2, Activity } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
const props = defineProps<{
  properties: any[];
  landSupply: any[];
  valuations: any[];
}>();
const parseArea = (areaStr: string) => {
  if (!areaStr) return 0;
  const match = String(areaStr).replace(/,/g, '').match(/[\d.]+/);
  if (!match) return 0;
  let val = parseFloat(match[0]);
  if (areaStr.toLowerCase().includes('sqm')) return val * 10.76;
  return val;
};
const totalCount = computed(() => props.properties.length + props.landSupply.length + props.valuations.length);
const totalArea = computed(() => {
  const pA = props.properties.reduce((a, b) => a + parseArea(b.area), 0);
  const lA = props.landSupply.reduce((a, b) => a + parseArea(b.area), 0);
  const vA = props.valuations.reduce((a, b) => a + parseArea(b.area), 0);
  return Math.round(pA + lA + vA);
});
const avgArea = computed(() => totalCount.value > 0 ? Math.round(totalArea.value / totalCount.value) : 0);
const displayCount = ref(0);
const displayArea = ref(0);
const animateValue = (start: number, end: number, refVar: any) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
    refVar.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};
onMounted(() => {
  animateValue(0, totalCount.value, displayCount);
  animateValue(0, totalArea.value, displayArea);
});
watch(totalCount, (newVal) => animateValue(0, newVal, displayCount));
watch(totalArea, (newVal) => animateValue(0, newVal, displayArea));
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
    <Card class="border-border shadow-soft relative overflow-hidden group">
      <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500/20" />
      <CardHeader class="pb-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="p-1.5 rounded-md bg-secondary text-indigo-500"><Hash class="w-4 h-4" /></span>
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Portfolio Items</p>
        </div>
        <CardTitle class="text-3xl font-black tracking-tighter">{{ displayCount.toLocaleString() }}</CardTitle>
      </CardHeader>
      <CardContent><p class="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Aggregated records</p></CardContent>
    </Card>
    <Card class="border-border shadow-soft relative overflow-hidden group">
      <div class="absolute top-0 left-0 w-1 h-full bg-orange-500/20" />
      <CardHeader class="pb-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="p-1.5 rounded-md bg-secondary text-orange-500"><Maximize2 class="w-4 h-4" /></span>
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Coverage</p>
        </div>
        <CardTitle class="text-3xl font-black tracking-tighter">{{ displayArea.toLocaleString() }} <span class="text-xs text-muted-foreground font-bold">SQFT</span></CardTitle>
      </CardHeader>
      <CardContent><p class="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Gross floor area</p></CardContent>
    </Card>
    <Card class="border-border shadow-soft relative overflow-hidden group">
      <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500/20" />
      <CardHeader class="pb-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="p-1.5 rounded-md bg-secondary text-emerald-500"><Activity class="w-4 h-4" /></span>
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Avg Asset Footprint</p>
        </div>
        <CardTitle class="text-3xl font-black tracking-tighter">{{ avgArea.toLocaleString() }} <span class="text-xs text-muted-foreground font-bold">SQFT</span></CardTitle>
      </CardHeader>
      <CardContent><p class="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Mean asset size</p></CardContent>
    </Card>
  </div>
</template>