import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref(true);
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
  function setSidebar(value: boolean) {
    isSidebarOpen.value = value;
  }
  type SnackbarColor = 'success' | 'error' | 'info' | 'warning';
  type SnackbarState = {
    show: boolean;
    message: string;
    color: SnackbarColor;
  };
  const snackbar = ref<SnackbarState>({ show: false, message: '', color: 'info' });
  function showSnackbar(payload: { message: string; color?: SnackbarColor }) {
    const message = payload.message;
    const color = payload.color || 'info';
    // Update internal state
    snackbar.value = {
      show: true,
      message,
      color,
    };
    // Trigger toast notification
    if (color === 'success') {
      toast.success(message);
    } else if (color === 'error') {
      toast.error(message);
    } else if (color === 'warning') {
      toast.warning(message);
    } else {
      toast.info(message);
    }
  }
  return {
    isSidebarOpen,
    toggleSidebar,
    setSidebar,
    snackbar,
    showSnackbar,
  };
});