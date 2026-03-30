<script setup lang="ts">
import { useThemeStore } from '../stores/theme'
import LiveIndicator from './LiveIndicator.vue'

const theme = useThemeStore()
</script>

<template>
  <header class="h-14 flex-shrink-0 border-b border-surface-800 light:border-surface-200 bg-surface-900/50 light:bg-white/80 backdrop-blur flex items-center justify-between px-6">
    <div class="flex items-center gap-3">
      <LiveIndicator />
    </div>

    <div class="flex items-center gap-3">
      <button
        @click="theme.toggle()"
        class="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 light:hover:text-surface-700 light:hover:bg-surface-100 transition-colors"
        :title="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <span v-if="theme.isDark" class="text-lg">☀️</span>
        <span v-else class="text-lg">🌙</span>
      </button>
    </div>
  </header>
</template>
