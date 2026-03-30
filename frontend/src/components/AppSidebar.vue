<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: 'Dashboard', icon: '◉' },
  { path: '/requests', label: 'Requests', icon: '⇄' },
  { path: '/queries', label: 'Queries', icon: '⛁' },
  { path: '/exceptions', label: 'Exceptions', icon: '⚠' },
  { path: '/models', label: 'Models', icon: '◧' },
  { path: '/logs', label: 'Logs', icon: '☰' },
  { path: '/cache', label: 'Cache', icon: '⧉' },
  { path: '/redis', label: 'Redis', icon: '◆' },
  { path: '/mail', label: 'Mail', icon: '✉' },
  { path: '/views', label: 'Views', icon: '◱' },
  { path: '/events', label: 'Events', icon: '⚡' },
  { path: '/commands', label: 'Commands', icon: '⌘' },
  { path: '/dumps', label: 'Dumps', icon: '⊞' },
  { path: '/http-client', label: 'HTTP Client', icon: '↗' },
  { path: '/gates', label: 'Gates', icon: '🔒' },
  { path: '/notifications', label: 'Notifications', icon: '🔔' },
  { path: '/schedule', label: 'Schedule', icon: '⏱' },
  { path: '/batches', label: 'Batches', icon: '▦' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="w-56 flex-shrink-0 bg-surface-900 light:bg-white border-r border-surface-800 light:border-surface-200 flex flex-col overflow-y-auto">
    <div class="p-4 pb-2">
      <router-link to="/" class="flex items-center gap-2 text-lg font-semibold text-primary-400">
        <span class="text-2xl">🔭</span>
        <span>Telescope</span>
      </router-link>
    </div>

    <nav class="flex-1 px-2 py-2 space-y-0.5">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
        :class="isActive(item.path)
          ? 'bg-primary-600/20 text-primary-400 light:bg-primary-100 light:text-primary-700'
          : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800 light:text-surface-600 light:hover:text-surface-800 light:hover:bg-surface-100'"
      >
        <span class="text-base w-5 text-center">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>
