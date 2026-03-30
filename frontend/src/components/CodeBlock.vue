<script setup lang="ts">
defineProps<{ code: string; language?: string }>()
</script>

<template>
  <div class="rounded-lg bg-surface-900 light:bg-surface-50 border border-surface-800 light:border-surface-200 overflow-x-auto">
    <pre class="p-4 text-xs font-mono text-surface-300 light:text-surface-700 whitespace-pre-wrap break-all leading-relaxed"><code>{{ code }}</code></pre>
  </div>
</template>
