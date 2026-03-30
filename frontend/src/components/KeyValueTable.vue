<script setup lang="ts">
defineProps<{ data: Record<string, any>; title?: string }>()

function formatValue(val: any): string {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'object') return JSON.stringify(val, null, 2)
  return String(val)
}
</script>

<template>
  <div class="rounded-lg border border-surface-800 light:border-surface-200 overflow-hidden">
    <div v-if="title" class="px-4 py-2.5 bg-surface-800/50 light:bg-surface-50 border-b border-surface-800 light:border-surface-200">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-surface-400">{{ title }}</h3>
    </div>
    <table class="w-full text-sm">
      <tbody>
        <tr
          v-for="(value, key) in data"
          :key="String(key)"
          class="border-b border-surface-800/50 light:border-surface-100 last:border-0"
        >
          <td class="py-2.5 px-4 text-xs font-medium text-surface-500 w-1/4 align-top whitespace-nowrap">
            {{ key }}
          </td>
          <td class="py-2.5 px-4 text-xs font-mono text-surface-300 light:text-surface-700 break-all">
            <pre v-if="typeof value === 'object'" class="whitespace-pre-wrap">{{ formatValue(value) }}</pre>
            <span v-else>{{ formatValue(value) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
