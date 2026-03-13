<script setup lang="ts"></script>
<template>
  <div class="space-y-6 w-full animate-pulse">
    <div class="flex justify-between items-end px-1">
      <div class="space-y-2">
        <div class="h-6 w-48 bg-muted rounded-md" />
        <div class="h-4 w-64 bg-muted/60 rounded-md" />
      </div>
      <div class="flex gap-2">
        <div class="h-9 w-24 bg-muted rounded-md" />
        <div class="h-9 w-16 bg-muted rounded-md" />
      </div>
    </div>
    <div class="border border-border rounded-xl shadow-sm overflow-hidden bg-card">
      <div class="bg-muted/40 h-12 border-b flex items-center px-4 gap-4">
        <div v-for="i in 6" :key="i" class="h-3 w-24 bg-muted-foreground/10 rounded" />
      </div>
      <div class="bg-background h-12 border-b flex items-center px-4 gap-4">
        <div v-for="i in 6" :key="i" class="h-8 w-full bg-muted/40 rounded-sm" />
      </div>
      <div class="divide-y divide-border">
        <div v-for="i in 5" :key="i" class="h-14 flex items-center px-4 gap-4">
          <div class="h-4 w-48 bg-muted/60 rounded" />
          <div class="h-4 w-20 bg-muted/40 rounded-full" />
          <div class="h-4 w-16 bg-muted/60 rounded" />
          <div class="h-4 w-16 bg-muted/60 rounded" />
          <div class="h-4 w-32 bg-muted/40 rounded" />
          <div class="h-4 w-32 bg-muted/40 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>