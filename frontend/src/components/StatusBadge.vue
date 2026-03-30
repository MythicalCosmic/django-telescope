<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ type: string; status?: number }>()

const colors = computed(() => {
  if (props.status) {
    if (props.status >= 500) return 'bg-red-500/20 text-red-400 border-red-500/30'
    if (props.status >= 400) return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    if (props.status >= 300) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }

  const map: Record<string, string> = {
    'request': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'query': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    'exception': 'bg-red-500/20 text-red-400 border-red-500/30',
    'model': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'log': 'bg-surface-500/20 text-surface-400 border-surface-500/30',
    'cache': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'redis': 'bg-red-500/20 text-red-400 border-red-500/30',
    'mail': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'view': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    'event': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'command': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    'dump': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'client-request': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'gate': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
    'notification': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    'schedule': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    'batch': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }
  return map[props.type] || 'bg-surface-500/20 text-surface-400 border-surface-500/30'
})

const label = computed(() => {
  if (props.status) return String(props.status)
  return props.type.replace(/-/g, ' ')
})
</script>

<template>
  <span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border capitalize" :class="colors">
    {{ label }}
  </span>
</template>
