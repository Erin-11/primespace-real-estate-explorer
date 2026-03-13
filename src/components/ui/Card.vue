<script setup lang="ts">
import { cn } from "@/lib/utils";
defineProps<{
  class?: string;
}>();
</script>
<template>
  <div :class="cn('rounded-xl border bg-card text-card-foreground shadow-sm', $props.class)">
    <slot />
  </div>
</template>
<script lang="ts">
export const CardHeader = {
  props: ['class'],
  template: `<div :class="cn('flex flex-col space-y-1.5 p-6', $props.class)"><slot /></div>`
};
export const CardTitle = {
  props: ['class'],
  template: `<h3 :class="cn('text-2xl font-semibold leading-none tracking-tight', $props.class)"><slot /></h3>`
};
export const CardDescription = {
  props: ['class'],
  template: `<p :class="cn('text-sm text-muted-foreground', $props.class)"><slot /></p>`
};
export const CardContent = {
  props: ['class'],
  template: `<div :class="cn('p-6 pt-0', $props.class)"><slot /></div>`
};
export const CardFooter = {
  props: ['class'],
  template: `<div :class="cn('flex items-center p-6 pt-0', $props.class)"><slot /></div>`
};
</script>