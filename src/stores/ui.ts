import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import type { DimensionType } from '@shared/types';
export type SnackbarColor = 'success' | 'error' | 'info' | 'warning';
/**
 * PrimeSpace UI Intelligence Store
 * Manages global application state including dimension switching, sidebar persistence,
 * and high-priority terminal navigation protocols.
 */
export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref(localStorage.getItem('sidebarOpen') !== 'false');
  const currentDimension = ref<DimensionType>(
    (localStorage.getItem('dimension') as DimensionType) || 'department'
  );
  const activeAssetTab = ref<string>(
    localStorage.getItem('activeAssetTab') || 'registry'
  );
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
    localStorage.setItem('sidebarOpen', String(isSidebarOpen.value));
  }
  function setSidebar(value: boolean) {
    isSidebarOpen.value = value;
    localStorage.setItem('sidebarOpen', String(value));
  }
  function setDimension(dim: DimensionType) {
    if (currentDimension.value === dim) return;
    currentDimension.value = dim;
    localStorage.setItem('dimension', dim);
    const message = dim === 'department'
      ? 'Terminal Mode: Market Sector Intelligence'
      : 'Terminal Mode: Global Portfolio Aggregator';
    toast.info(message, {
      description: 'Institutional intelligence layers re-synchronized.',
      duration: 3500
    });
  }
  function toggleDimension() {
    const newDim = currentDimension.value === 'department' ? 'assets' : 'department';
    setDimension(newDim);
  }
  function setActiveAssetTab(tab: string) {
    activeAssetTab.value = tab;
    localStorage.setItem('activeAssetTab', tab);
  }
  /**
   * Atomic operation to navigate to a specific asset intelligence hub.
   * Ensures the system is in 'assets' dimension before setting the active tab.
   */
  function navigateToAssetTab(tab: string) {
    setDimension('assets');
    setActiveAssetTab(tab);
  }
  function showSnackbar(payload: { message: string; color?: SnackbarColor }) {
    const message = payload.message;
    const color = payload.color || 'info';
    switch (color) {
      case 'success':
        toast.success(message, { description: 'Protocol execution confirmed.' });
        break;
      case 'error':
        toast.error(message, { description: 'Security exception detected.' });
        break;
      case 'warning':
        toast.warning(message, { description: 'System performance warning.' });
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
    navigateToAssetTab,
    showSnackbar,
  };
});