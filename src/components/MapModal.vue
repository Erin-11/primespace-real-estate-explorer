<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Loader2, MapPin, ExternalLink, X } from 'lucide-vue-next';
const props = defineProps<{
  address: string;
  isOpen: boolean;
}>();
const emit = defineEmits(['onClose']);
const isLoaded = ref(false);
const encodedAddress = ref('');
watch(() => props.address, (newAddr) => {
  encodedAddress.value = encodeURIComponent(newAddr);
  isLoaded.value = false;
}, { immediate: true });
const close = () => {
  emit('onClose');
};
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" @click="close"></div>
    <!-- Content -->
    <div class="relative w-full max-w-4xl bg-background rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
      <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center gap-2 truncate pr-8">
          <MapPin class="w-4 h-4 text-primary shrink-0" />
          <h3 class="text-sm font-bold truncate tracking-tight">{{ address || 'Location Explorer' }}</h3>
        </div>
        <div class="flex items-center gap-4">
          <a
            v-if="address"
            :href="`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            Open Maps <ExternalLink class="w-3 h-3" />
          </a>
          <button @click="close" class="p-1 hover:bg-secondary rounded-md transition-colors">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="relative aspect-video bg-muted overflow-hidden">
        <div v-if="!isLoaded" class="absolute inset-0 flex flex-col items-center justify-center bg-secondary/30 backdrop-blur-[2px] z-10">
          <Loader2 class="w-8 h-8 text-primary animate-spin mb-2" />
          <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Loading Map Spatial Data...</p>
        </div>
        <iframe
          v-if="address"
          :title="`Map of ${address}`"
          width="100%"
          height="100%"
          frameborder="0"
          style="border:0"
          :src="`https://www.google.com/maps?q=${encodedAddress}&output=embed`"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          @load="isLoaded = true"
          :class="['transition-opacity duration-700', isLoaded ? 'opacity-100' : 'opacity-0']"
        ></iframe>
        <div v-else class="flex items-center justify-center h-full text-muted-foreground italic text-sm">
          No address provided for spatial preview.
        </div>
      </div>
    </div>
  </div>
</template>