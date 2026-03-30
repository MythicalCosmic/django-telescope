<script setup lang="ts">
import type { TelescopeEntry } from '../types'
import { formatTimeAgo } from '../composables/useTimeAgo'
import StatusBadge from './StatusBadge.vue'
import DurationBadge from './DurationBadge.vue'

defineProps<{
  entries: TelescopeEntry[]
  loading?: boolean
  detailRoute?: string
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-surface-800 light:border-surface-200">
          <th class="text-left py-3 px-4 text-xs uppercase tracking-wider text-surface-500 font-medium">Type</th>
          <th class="text-left py-3 px-4 text-xs uppercase tracking-wider text-surface-500 font-medium">Summary</th>
          <th class="text-left py-3 px-4 text-xs uppercase tracking-wider text-surface-500 font-medium">Tags</th>
          <th class="text-right py-3 px-4 text-xs uppercase tracking-wider text-surface-500 font-medium">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading && entries.length === 0" v-for="i in 8" :key="i">
          <td class="py-3 px-4"><div class="skeleton h-4 w-16"></div></td>
          <td class="py-3 px-4"><div class="skeleton h-4 w-64"></div></td>
          <td class="py-3 px-4"><div class="skeleton h-4 w-20"></div></td>
          <td class="py-3 px-4 text-right"><div class="skeleton h-4 w-12 ml-auto"></div></td>
        </tr>
        <tr
          v-for="entry in entries"
          :key="entry.uuid"
          class="border-b border-surface-800/50 light:border-surface-100 hover:bg-surface-800/50 light:hover:bg-surface-50 transition-colors cursor-pointer animate-fade-in"
          @click="$router.push({ name: detailRoute || `${entry.type_slug}-detail`, params: { uuid: entry.uuid } })"
        >
          <td class="py-3 px-4">
            <StatusBadge :type="entry.type_slug" />
          </td>
          <td class="py-3 px-4 text-surface-300 light:text-surface-700 max-w-md truncate font-mono text-xs">
            {{ entry.summary }}
          </td>
          <td class="py-3 px-4">
            <div class="flex gap-1 flex-wrap">
              <span
                v-for="tag in entry.tags?.slice(0, 3)"
                :key="tag"
                class="inline-block px-1.5 py-0.5 text-xs rounded bg-surface-800 light:bg-surface-100 text-surface-400 light:text-surface-500"
              >
                {{ tag }}
              </span>
            </div>
          </td>
          <td class="py-3 px-4 text-right text-xs text-surface-500 whitespace-nowrap">
            {{ formatTimeAgo(entry.created_at) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && entries.length === 0" class="text-center py-16 text-surface-500">
      <div class="text-4xl mb-3 opacity-30">🔭</div>
      <p>No entries found</p>
    </div>
  </div>
</template>
