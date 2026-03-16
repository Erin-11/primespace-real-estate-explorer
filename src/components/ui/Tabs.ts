import { h, defineComponent, provide, inject, ref, watch, computed, type PropType, type Ref } from 'vue';
import { cn } from '@/lib/utils';
const TabsContextSymbol = Symbol('TabsContext');
interface TabsContext {
  activeTab: Ref<string>;
  setActiveTab: (value: string) => void;
}
export const Tabs = defineComponent({
  name: 'Tabs',
  props: {
    defaultValue: { type: String, required: true },
    class: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const activeTab = ref(props.defaultValue);
    watch(() => props.defaultValue, (val) => {
      activeTab.value = val;
    });
    provide(TabsContextSymbol, {
      activeTab,
      setActiveTab: (val: string) => { activeTab.value = val; }
    });
    return () => h('div', { class: props.class }, slots.default?.());
  }
});
export const TabsList = defineComponent({
  name: 'TabsList',
  props: {
    class: { type: String, default: '' }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', props.class)
    }, slots.default?.());
  }
});
export const TabsTrigger = defineComponent({
  name: 'TabsTrigger',
  props: {
    value: { type: String, required: true },
    class: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const context = inject(TabsContextSymbol) as TabsContext;
    const isActive = computed(() => context.activeTab.value === props.value);
    return () => h('button', {
      type: 'button',
      role: 'tab',
      'aria-selected': isActive.value,
      onClick: () => context.setActiveTab(props.value),
      class: cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive.value ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50',
        props.class
      )
    }, slots.default?.());
  }
});
export const TabsContent = defineComponent({
  name: 'TabsContent',
  props: {
    value: { type: String, required: true },
    class: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const context = inject(TabsContextSymbol) as TabsContext;
    const isActive = computed(() => context.activeTab.value === props.value);
    return () => isActive.value ? h('div', {
      role: 'tabpanel',
      class: cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)
    }, slots.default?.()) : null;
  }
});
export default Tabs;