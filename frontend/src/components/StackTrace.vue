<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  frames: Array<{
    file: string
    line: number
    function: string
    context?: {
      start_line: number
      lines: string[]
      highlight_line: number
    } | null
  }>
}>()

const expandedFrame = ref<number | null>(props.frames.length > 0 ? props.frames.length - 1 : null)
</script>

<template>
  <div class="rounded-lg border border-surface-800 light:border-surface-200 overflow-hidden">
    <div class="px-4 py-2.5 bg-surface-800/50 light:bg-surface-50 border-b border-surface-800 light:border-surface-200">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-surface-400">Stack Trace</h3>
    </div>
    <div>
      <div
        v-for="(frame, i) in frames"
        :key="i"
        class="border-b border-surface-800/30 light:border-surface-100 last:border-0"
      >
        <button
          class="w-full text-left px-4 py-2.5 hover:bg-surface-800/30 light:hover:bg-surface-50 transition-colors flex items-center gap-2"
          @click="expandedFrame = expandedFrame === i ? null : i"
        >
          <span class="text-xs text-surface-500 w-6">{{ i + 1 }}</span>
          <span class="text-xs font-mono text-primary-400">{{ frame.function }}</span>
          <span class="text-xs text-surface-500 truncate">{{ frame.file }}:{{ frame.line }}</span>
        </button>

        <div v-if="expandedFrame === i && frame.context" class="bg-surface-950 light:bg-surface-50 overflow-x-auto">
          <pre class="text-xs font-mono leading-5"><template v-for="(line, j) in frame.context.lines" :key="j"><div
            class="px-4"
            :class="frame.context.start_line + j === frame.context.highlight_line
              ? 'bg-red-500/10 text-red-300 light:text-red-700'
              : 'text-surface-500'"
          ><span class="inline-block w-10 text-right mr-4 text-surface-600 select-none">{{ frame.context.start_line + j }}</span>{{ line }}</div></template></pre>
        </div>
      </div>
    </div>
  </div>
</template>
