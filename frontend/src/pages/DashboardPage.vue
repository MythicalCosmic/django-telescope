<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { api } from '../api'
import { getWebSocket } from '../websocket'
import type { StatusResponse, TelescopeEntry } from '../types'
import EntryTable from '../components/EntryTable.vue'

const status = ref<StatusResponse | null>(null)
const recentEntries = ref<TelescopeEntry[]>([])
const loading = ref(true)

const ws = getWebSocket()

async function load() {
  loading.value = true
  try {
    const [s, e] = await Promise.all([api.status(), api.entries({ limit: '20' })])
    status.value = s
    recentEntries.value = e.entries
  } finally {
    loading.value = false
  }
}

const unsub = ws.onEntry((entry) => {
  recentEntries.value.unshift(entry)
  if (recentEntries.value.length > 50) recentEntries.value = recentEntries.value.slice(0, 50)
  // Update counts
  if (status.value) {
    status.value.total_entries++
    const slug = entry.type_slug
    if (status.value.types[slug]) {
      status.value.types[slug].count++
    } else {
      status.value.types[slug] = { label: entry.type_label, count: 1 }
    }
  }
})

onMounted(load)
onUnmounted(unsub)

const typeColors: Record<string, string> = {
  request: 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
  query: 'from-violet-500/20 to-violet-600/5 border-violet-500/20',
  exception: 'from-red-500/20 to-red-600/5 border-red-500/20',
  model: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
  log: 'from-surface-500/20 to-surface-600/5 border-surface-500/20',
  cache: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
  mail: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-surface-100 light:text-surface-900 mb-6">Dashboard</h1>

    <!-- Stats Grid -->
    <div v-if="status" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
      <div
        v-for="(info, slug) in status.types"
        :key="slug"
        class="rounded-xl border bg-gradient-to-br p-4 transition-all hover:scale-[1.02]"
        :class="typeColors[slug as string] || 'from-surface-500/20 to-surface-600/5 border-surface-500/20'"
      >
        <div class="text-xs uppercase tracking-wider text-surface-400 mb-1">{{ info.label }}</div>
        <div class="text-2xl font-bold text-surface-100 light:text-surface-800">{{ info.count.toLocaleString() }}</div>
      </div>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
      <div v-for="i in 5" :key="i" class="rounded-xl border border-surface-800 p-4">
        <div class="skeleton h-3 w-16 mb-2"></div>
        <div class="skeleton h-8 w-20"></div>
      </div>
    </div>

    <!-- Recent Entries -->
    <div class="rounded-xl border border-surface-800 light:border-surface-200 overflow-hidden">
      <div class="px-4 py-3 border-b border-surface-800 light:border-surface-200 bg-surface-800/30 light:bg-surface-50">
        <h2 class="text-sm font-semibold text-surface-300 light:text-surface-700">Recent Entries</h2>
      </div>
      <EntryTable :entries="recentEntries" :loading="loading" />
    </div>
  </div>
</template>
