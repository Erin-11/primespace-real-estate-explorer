<script setup lang="ts">
import { onMounted } from 'vue';
import { Toaster } from 'vue-sonner';
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>
<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component v-if="Component" :is="Component" :key="$route.path" />
      </transition>
    </router-view>
    <Toaster position="bottom-right" richColors closeButton />
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>