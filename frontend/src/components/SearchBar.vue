<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue?: string; placeholder?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string]; search: [value: string] }>()

const query = ref(props.modelValue || '')
let debounceTimer: ReturnType<typeof setTimeout>

watch(query, (val) => {
  emit('update:modelValue', val)
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => emit('search', val), 300)
})
</script>

<template>
  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 text-sm">🔍</span>
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder || 'Search...'"
      class="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-800 light:bg-surface-100 border border-surface-700 light:border-surface-200 text-sm text-surface-200 light:text-surface-800 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
    />
  </div>
</template>
