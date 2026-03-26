<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'radix-vue';
import { X, User, Phone, Mail, ShieldCheck, History, ExternalLink, Inbox, Star } from 'lucide-vue-next';
import type { ContactRecord } from '@shared/mock-data';
import Tabs from '@/components/ui/Tabs.vue';
import { cn } from '@/lib/utils';
const props = defineProps<{
  isOpen: boolean;
  title: string;
  contacts: ContactRecord[];
}>();
const emit = defineEmits(['close']);
const activeTab = ref('current');
const tabItems = [
  { id: 'current', label: 'Active Stakeholders' },
  { id: 'historical', label: 'Historical Audit' },
];
const filteredContacts = computed(() => {
  const list = props.contacts.filter(c => c.type === activeTab.value);
  if (activeTab.value === 'current') {
    return [...list].sort((a, b) => {
      const priority = (role: string) => {
        if (role.includes('Director')) return 1;
        if (role.includes('Manager')) return 2;
        return 3;
      };
      return priority(a.role) - priority(b.role);
    });
  }
  return list;
});
const handleOpenChange = (val: boolean) => {
  if (!val) emit('close');
};
</script>
<template>
  <DialogRoot :open="isOpen" @update:open="handleOpenChange">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-all duration-300" />
      <DialogContent class="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-card border shadow-2xl overflow-hidden focus:outline-none animate-in fade-in-0 zoom-in-95 duration-300">
        <div class="flex flex-col max-h-[85vh]">
          <div class="px-8 py-6 border-b bg-card">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck class="h-6 w-6" />
                </div>
                <div>
                  <DialogTitle class="text-2xl font-black tracking-tighter">{{ title }}</DialogTitle>
                  <DialogDescription class="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                    Institutional Relationship Intelligence
                  </DialogDescription>
                </div>
              </div>
              <DialogClose class="p-2 rounded-xl hover:bg-accent transition-colors focus:outline-none">
                <X class="h-6 w-6" />
              </DialogClose>
            </div>
            <Tabs v-model="activeTab" :tabs="tabItems" />
          </div>
          <div class="flex-1 overflow-y-auto p-8 space-y-4 bg-muted/5 custom-scrollbar min-h-[450px]">
            <div v-if="filteredContacts.length === 0" class="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div class="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                <Inbox class="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p class="text-sm font-bold text-muted-foreground/60 max-w-[240px]">
                No verified records identified for this classification.
              </p>
            </div>
            <div
              v-for="contact in filteredContacts"
              :key="`${contact.name}-${contact.email}`"
              :class="cn(
                'group relative border rounded-2xl p-6 transition-all duration-300',
                contact.type === 'current' 
                  ? 'border-primary/30 bg-primary/[0.03] shadow-lg shadow-primary/5 ring-1 ring-primary/5' 
                  : 'bg-card border-border/50 opacity-80'
              )"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex gap-4">
                  <div :class="cn(
                    'h-14 w-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm',
                    contact.type === 'current' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  )">
                    <User class="h-6 w-6" />
                  </div>
                  <div class="space-y-1">
                    <div :class="cn(
                      'tracking-tight text-xl flex items-center gap-2',
                      contact.type === 'current' ? 'font-black text-foreground' : 'font-bold text-muted-foreground'
                    )">
                      {{ contact.name }}
                      <Star v-if="contact.type === 'current'" class="h-4 w-4 text-amber-500 fill-amber-500" />
                    </div>
                    <div class="flex items-center gap-2">
                      <span :class="cn(
                        'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded',
                        contact.type === 'current' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      )">
                        {{ contact.role }}
                      </span>
                      <span v-if="contact.type === 'historical'" class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/5 text-amber-600 flex items-center gap-1">
                        <History class="h-3 w-3" /> Legacy
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <a :href="`tel:${contact.phone}`" class="p-2.5 rounded-xl border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group-hover:scale-110 active:scale-95">
                    <Phone class="h-4 w-4" />
                  </a>
                  <a :href="`mailto:${contact.email}`" class="p-2.5 rounded-xl border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group-hover:scale-110 active:scale-95">
                    <Mail class="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-dashed border-border/50 grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <span class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Direct Terminal</span>
                  <span class="text-sm font-bold tracking-tight">{{ contact.phone }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Secure Protocol</span>
                  <span class="text-sm font-bold tracking-tight truncate">{{ contact.email }}</span>
                </div>
              </div>
              <div v-if="contact.type === 'current'" class="absolute top-4 right-4 flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/10 text-[8px] font-black text-green-600 uppercase tracking-widest">
                <div class="h-1 w-1 rounded-full bg-green-600 animate-pulse"></div>
                Active Stakeholder
              </div>
            </div>
          </div>
          <div class="px-8 py-4 border-t bg-card flex items-center justify-between text-[10px] text-muted-foreground font-black uppercase tracking-widest">
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              Synced with Governance Engine v4.2
            </div>
            <button class="flex items-center gap-1.5 hover:text-primary transition-colors">
              Request Audit Trail <ExternalLink class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>