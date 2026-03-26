import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import type { DimensionType } from '@shared/types';
export type SnackbarColor = 'success' | 'error' | 'info' | 'warning';
export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref(true);
  const currentDimension = ref<DimensionType>(
    (localStorage.getItem('dimension') as DimensionType) || 'department'
  );
  const activeAssetTab = ref<string>(
    localStorage.getItem('activeAssetTab') || 'registry'
  );
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
  function setSidebar(value: boolean) {
    isSidebarOpen.value = value;
  }
  function toggleDimension() {
    currentDimension.value = currentDimension.value === 'department' ? 'assets' : 'department';
    localStorage.setItem('dimension', currentDimension.value);
    const message = currentDimension.value === 'department' 
      ? 'Navigation Switched: Now browsing by Market Sector' 
      : 'Navigation Switched: Global Asset layers are now accessible via the sidebar.';
    toast.info(message, {
      description: 'System intelligence update synchronized.'
    });
  }
  function setDimension(dim: DimensionType) {
    if (currentDimension.value === dim) return;
    currentDimension.value = dim;
    localStorage.setItem('dimension', dim);
  }
  function setActiveAssetTab(tab: string) {
    activeAssetTab.value = tab;
    localStorage.setItem('activeAssetTab', tab);
  }
  function showSnackbar(payload: { message: string; color?: SnackbarColor }) {
    const message = payload.message;
    const color = payload.color || 'info';
    switch (color) {
      case 'success':
        toast.success(message, { description: 'Protocol execution successful.' });
        break;
      case 'error':
        toast.error(message, { description: 'Security exception detected.' });
        break;
      case 'warning':
        toast.warning(message, { description: 'Protocol warning.' });
        break;
      default:
        toast.info(message, { description: 'System intelligence update.' });
    }
  }
  return {
    isSidebarOpen,
    currentDimension,
    activeAssetTab,
    toggleSidebar,
    setSidebar,
    toggleDimension,
    setDimension,
    setActiveAssetTab,
    showSnackbar,
  };
});