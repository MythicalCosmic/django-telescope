<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'
import type { TelescopeEntry } from '../types'
import KeyValueTable from '../components/KeyValueTable.vue'
import CodeBlock from '../components/CodeBlock.vue'
import StatusBadge from '../components/StatusBadge.vue'
import DurationBadge from '../components/DurationBadge.vue'

const route = useRoute()
const router = useRouter()
const entry = ref<TelescopeEntry | null>(null)
const batchEntries = ref<TelescopeEntry[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const data = await api.entryDetail(route.params.uuid as string)
    entry.value = data.entry
    if (data.entry.batch_id) {
      const batch = await api.batch(data.entry.batch_id)
      batchEntries.value = batch.entries.filter(e => e.uuid !== data.entry.uuid)
    }
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div>
    <button @click="router.back()" class="text-sm text-surface-400 hover:text-surface-200 mb-4 transition-colors">
      ← Back to Requests
    </button>

    <div v-if="loading" class="space-y-4">
      <div class="skeleton h-8 w-64"></div>
      <div class="skeleton h-48 w-full rounded-xl"></div>
    </div>

    <div v-else-if="entry" class="space-y-6 animate-fade-in">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold text-surface-100 light:text-surface-900 font-mono">
          {{ entry.content?.method }} {{ entry.content?.path }}
        </h1>
        <StatusBadge :type="entry.type_slug" :status="entry.content?.status_code" />
        <DurationBadge v-if="entry.content?.duration" :ms="entry.content.duration" />
      </div>

      <!-- Request Info -->
      <KeyValueTable
        title="Request"
        :data="{
          'Method': entry.content?.method,
          'Path': entry.content?.path,
          'Status': entry.content?.status_code,
          'Duration': entry.content?.duration ? `${entry.content.duration}ms` : null,
          'IP Address': entry.content?.ip_address,
          'Controller': entry.content?.controller_action,
          'User': entry.content?.user,
        }"
      />

      <!-- Request Headers -->
      <KeyValueTable v-if="entry.content?.request_headers" title="Request Headers" :data="entry.content.request_headers" />

      <!-- Payload -->
      <div v-if="entry.content?.payload && Object.keys(entry.content.payload).length">
        <CodeBlock :code="JSON.stringify(entry.content.payload, null, 2)" language="json" />
      </div>

      <!-- Response Headers -->
      <KeyValueTable v-if="entry.content?.response_headers" title="Response Headers" :data="entry.content.response_headers" />

      <!-- Response Body -->
      <div v-if="entry.content?.response_body">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-2">Response Body</h3>
        <CodeBlock :code="typeof entry.content.response_body === 'string' ? entry.content.response_body : JSON.stringify(entry.content.response_body, null, 2)" />
      </div>

      <!-- Session -->
      <KeyValueTable v-if="entry.content?.session" title="Session" :data="entry.content.session" />

      <!-- Related Batch Entries -->
      <div v-if="batchEntries.length" class="rounded-xl border border-surface-800 light:border-surface-200 overflow-hidden">
        <div class="px-4 py-2.5 bg-surface-800/50 light:bg-surface-50 border-b border-surface-800 light:border-surface-200">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-surface-400">Related Entries ({{ batchEntries.length }})</h3>
        </div>
        <div class="divide-y divide-surface-800/50 light:divide-surface-100">
          <div
            v-for="be in batchEntries"
            :key="be.uuid"
            class="px-4 py-2.5 flex items-center gap-3 hover:bg-surface-800/30 light:hover:bg-surface-50 cursor-pointer transition-colors"
            @click="$router.push({ name: `${be.type_slug}-detail`, params: { uuid: be.uuid } })"
          >
            <StatusBadge :type="be.type_slug" />
            <span class="text-xs font-mono text-surface-400 truncate">{{ be.summary }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
