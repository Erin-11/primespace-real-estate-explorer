<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Sun, Moon } from 'lucide-vue-next';
const isDark = ref(false);
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});
const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};
</script>
<template>
  <button
    @click="toggleTheme"
    class="fixed top-4 right-4 z-[100] p-2.5 rounded-full bg-background border border-border shadow-soft hover:scale-110 active:scale-95 transition-all duration-200 group"
    :aria-label="isDark ? 'Switch to light' : 'Switch to dark'"
  >
    <Sun v-if="isDark" class="w-5 h-5 text-amber-500 group-hover:rotate-45 transition-transform" />
    <Moon v-else class="w-5 h-5 text-indigo-500 group-hover:-rotate-12 transition-transform" />
  </button>
</template>