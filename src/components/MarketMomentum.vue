<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { TrendingUp, Activity, Info, Zap } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
const hoveredIndex = ref<number | null>(null);
const isAnimated = ref(false);
const dataPoints = [
  { month: 'Jan', value: 3.1, activity: 'High' },
  { month: 'Feb', value: 3.2, activity: 'Stable' },
  { month: 'Mar', value: 3.4, activity: 'Peak' },
  { month: 'Apr', value: 3.3, activity: 'Stable' },
  { month: 'May', value: 3.5, activity: 'Growth' },
  { month: 'Jun', value: 3.8, activity: 'High' },
  { month: 'Jul', value: 3.7, activity: 'Stable' },
  { month: 'Aug', value: 3.9, activity: 'Peak' },
  { month: 'Sep', value: 4.1, activity: 'Surge' },
  { month: 'Oct', value: 4.0, activity: 'High' },
  { month: 'Nov', value: 4.2, activity: 'Max' },
  { month: 'Dec', value: 4.4, activity: 'Projected' },
];
const width = 1000;
const height = 240;
const padding = 50;
const getX = (index: number) => padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
const getY = (value: number) => {
  const min = 2.8;
  const max = 4.8;
  return height - padding - ((value - min) / (max - min)) * (height - 2 * padding);
};
const pathData = computed(() => {
  return dataPoints.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getY(point.value);
    if (i === 0) return `M ${x} ${y}`;
    const prevX = getX(i - 1);
    const prevY = getY(dataPoints[i - 1].value);
    const cp1x = prevX + (x - prevX) / 2;
    const cp2x = prevX + (x - prevX) / 2;
    return `${acc} C ${cp1x} ${prevY}, ${cp2x} ${y}, ${x} ${y}`;
  }, '');
});
const areaPathData = computed(() => {
  const lastX = getX(dataPoints.length - 1);
  const firstX = getX(0);
  const baseline = height - padding;
  return `${pathData.value} L ${lastX} ${baseline} L ${firstX} ${baseline} Z`;
});
onMounted(() => {
  setTimeout(() => (isAnimated.value = true), 200);
});
</script>
<template>
  <div class="bg-card border rounded-[2.5rem] p-8 shadow-soft overflow-hidden group/momentum transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          <Activity class="h-3 w-3" /> Real-Time Market Pulse
        </div>
        <h2 class="text-3xl font-black tracking-tighter">GBA Market <span class="text-gradient">Momentum</span></h2>
        <p class="text-xs text-muted-foreground font-medium uppercase tracking-widest">Aggregate Yield Index & Transactional Velocity</p>
      </div>
      <div class="flex items-center gap-8 bg-muted/5 rounded-2xl p-4 border border-dashed">
        <div class="text-right">
          <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Avg. Market Yield</div>
          <div class="text-xl font-black tracking-tight text-primary flex items-center justify-end gap-1.5">
            3.42% <TrendingUp class="h-4 w-4" />
          </div>
        </div>
        <div class="h-8 w-px bg-border"></div>
        <div class="text-right">
          <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Volatility</div>
          <div class="text-xl font-black tracking-tight flex items-center justify-end gap-1.5">
            Low <Zap class="h-4 w-4 text-amber-500 fill-amber-500/20" />
          </div>
        </div>
      </div>
    </div>
    <div class="relative w-full h-[240px] select-none">
      <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="momentumGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="50%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
          <linearGradient id="momentumAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
          </linearGradient>
        </defs>
        <!-- Grid Lines -->
        <g class="opacity-[0.05]">
          <line v-for="i in 5" :key="i" :x1="padding" :y1="getY(2.8 + i * 0.4)" :x2="width - padding" :y2="getY(2.8 + i * 0.4)" stroke="currentColor" stroke-width="1" />
        </g>
        <!-- Area Fill -->
        <path :d="areaPathData" fill="url(#momentumAreaGradient)" class="transition-opacity duration-1000" :class="isAnimated ? 'opacity-100' : 'opacity-0'" />
        <!-- Main Line -->
        <path
          :d="pathData"
          fill="none"
          stroke="url(#momentumGradient)"
          stroke-width="5"
          stroke-linecap="round"
          class="transition-all duration-1000 ease-in-out"
          :style="{ strokeDasharray: 2000, strokeDashoffset: isAnimated ? 0 : 2000 }"
        />
        <!-- Current Point Pulse -->
        <circle :cx="getX(dataPoints.length - 1)" :cy="getY(dataPoints[dataPoints.length - 1].value)" r="8" class="fill-primary/20 animate-ping" />
        <!-- Scanner Line -->
        <line
          v-if="hoveredIndex !== null"
          :x1="getX(hoveredIndex)"
          y1="0"
          :x2="getX(hoveredIndex)"
          :y2="height - padding"
          stroke="hsl(var(--primary))"
          stroke-width="1"
          stroke-dasharray="4"
          class="animate-in fade-in duration-200"
        />
        <!-- Data Points -->
        <g v-for="(point, i) in dataPoints" :key="i">
          <circle
            :cx="getX(i)"
            :cy="getY(point.value)"
            :r="hoveredIndex === i ? 7 : 5"
            class="transition-all duration-200 cursor-crosshair"
            :class="hoveredIndex === i ? 'fill-primary stroke-background stroke-2' : 'fill-background stroke-primary stroke-2'"
          />
          <!-- Invisible Hit Zones -->
          <rect
            :x="getX(i) - 30"
            y="0"
            width="60"
            :height="height"
            fill="transparent"
            class="cursor-crosshair"
            @mouseenter="hoveredIndex = i"
            @mouseleave="hoveredIndex = null"
          />
        </g>
        <!-- Labels -->
        <g class="text-[10px] font-black uppercase tracking-widest fill-muted-foreground/30">
          <text v-for="(point, i) in dataPoints" :key="i" :x="getX(i)" :y="height - 15" text-anchor="middle">
            {{ i % 2 === 0 ? point.month : '' }}
          </text>
        </g>
      </svg>
      <!-- Tooltip -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="scale-90 opacity-0" enter-to-class="scale-100 opacity-100">
        <div
          v-if="hoveredIndex !== null"
          class="absolute z-30 pointer-events-none bg-background/95 border shadow-2xl rounded-2xl p-4 backdrop-blur-md min-w-[140px]"
          :style="{
            left: `${(getX(hoveredIndex) / width) * 100}%`,
            top: `${(getY(dataPoints[hoveredIndex].value) / height) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 30px))'
          }"
        >
          <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{{ dataPoints[hoveredIndex].month }} Projection</div>
          <div class="text-2xl font-black tracking-tighter leading-none text-primary">{{ dataPoints[hoveredIndex].value }}%</div>
          <div class="mt-3 flex items-center gap-2">
            <div class="h-1.5 w-1.5 rounded-full bg-primary shadow-sm"></div>
            <span class="text-[9px] font-black uppercase tracking-widest">{{ dataPoints[hoveredIndex].activity }} Protocol</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mt-8 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5"><div class="h-2 w-2 rounded-full bg-primary/20"></div> Projection Baseline</div>
        <div class="flex items-center gap-1.5"><div class="h-2 w-2 rounded-full bg-primary"></div> Verified Yield</div>
      </div>
      <div class="flex items-center gap-1 hover:text-primary transition-colors cursor-help group/info">
        Intelligence Methodology <Info class="h-3 w-3 group-hover/info:rotate-12 transition-transform" />
      </div>
    </div>
  </div>
</template>