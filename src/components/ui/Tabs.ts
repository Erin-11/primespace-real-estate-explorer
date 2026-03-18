import { h, defineComponent, provide, inject, ref, watch, computed, type Ref, type SetupContext } from 'vue';
import { cn } from '@/lib/utils';
const TabsContextSymbol = Symbol('TabsContext');
interface TabsContext {
  activeTab: Ref<string>;
  setActiveTab: (value: string) => void;
}
export const Tabs = defineComponent({
  name: 'PrimeTabs',
  props: {
    defaultValue: { type: String, required: true },
    class: { type: String, default: '' }
  },
  setup(props: { defaultValue: string; class?: string }, { slots }: SetupContext) {
    const activeTab = ref(props.defaultValue);
    watch(() => props.defaultValue, (val) => {
      activeTab.value = val;
    });
    provide(TabsContextSymbol, {
      activeTab,
      setActiveTab: (val: string) => {
        activeTab.value = val;
      }
    });
    return () => h('div', { class: props.class }, slots.default?.());
  }
});
export const TabsList = defineComponent({
  name: 'PrimeTabsList',
  props: {
    class: { type: String, default: '' }
  },
  setup(props: { class?: string }, { slots }: SetupContext) {
    return () => h('div', {
      class: cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', props.class)
    }, slots.default?.());
  }
});
export const TabsTrigger = defineComponent({
  name: 'PrimeTabsTrigger',
  props: {
    value: { type: String, required: true },
    class: { type: String, default: '' }
  },
  setup(props: { value: string; class?: string }, { slots }: SetupContext) {
    const context = inject(TabsContextSymbol) as TabsContext;
    if (!context) throw new Error('TabsTrigger must be used within Tabs');
    const isActive = computed(() => context.activeTab.value === props.value);
    return () => h('button', {
      type: 'button',
      role: 'tab',
      'aria-selected': isActive.value,
      onClick: () => context.setActiveTab(props.value),
      class: cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive.value
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'hover:bg-background/50',
        props.class
      )
    }, slots.default?.());
  }
});
export const TabsContent = defineComponent({
  name: 'PrimeTabsContent',
  props: {
    value: { type: String, required: true },
    class: { type: String, default: '' }
  },
  setup(props: { value: string; class?: string }, { slots }: SetupContext) {
    const context = inject(TabsContextSymbol) as TabsContext;
    if (!context) throw new Error('TabsContent must be used within Tabs');
    const isActive = computed(() => context.activeTab.value === props.value);
    return () => isActive.value ? h('div', {
      role: 'tabpanel',
      class: cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)
    }, slots.default?.()) : null;
  }
});
export default Tabs;