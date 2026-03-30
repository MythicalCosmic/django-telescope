<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { getWebSocket } from '../websocket'

const ws = getWebSocket()

onMounted(() => { ws.connect() })
onUnmounted(() => { /* keep connection alive */ })
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <span
      class="inline-block w-2 h-2 rounded-full"
      :class="{
        'bg-emerald-400 animate-pulse-dot': ws.status.value === 'connected',
        'bg-amber-400 animate-pulse': ws.status.value === 'connecting',
        'bg-red-400': ws.status.value === 'disconnected',
      }"
    />
    <span class="text-surface-500 light:text-surface-400 text-xs uppercase tracking-wider font-medium">
      {{ ws.status.value === 'connected' ? 'Live' : ws.status.value === 'connecting' ? 'Connecting...' : 'Disconnected' }}
    </span>
  </div>
</template>
