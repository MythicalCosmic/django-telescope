<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ ms: number }>()

const formatted = computed(() => {
  if (props.ms < 1) return `${(props.ms * 1000).toFixed(0)}µs`
  if (props.ms < 1000) return `${props.ms.toFixed(1)}ms`
  return `${(props.ms / 1000).toFixed(2)}s`
})

const color = computed(() => {
  if (props.ms > 1000) return 'text-red-400'
  if (props.ms > 200) return 'text-amber-400'
  return 'text-emerald-400'
})
</script>

<template>
  <span class="font-mono text-xs" :class="color">{{ formatted }}</span>
</template>
