<script setup lang="ts">
defineProps<{ title: string; message: string; open: boolean }>()
const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="emit('cancel')" />
        <div class="relative bg-surface-900 light:bg-white border border-surface-700 light:border-surface-200 rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in">
          <h3 class="text-lg font-semibold text-surface-100 light:text-surface-900 mb-2">{{ title }}</h3>
          <p class="text-sm text-surface-400 mb-6">{{ message }}</p>
          <div class="flex gap-3 justify-end">
            <button
              @click="emit('cancel')"
              class="px-4 py-2 text-sm rounded-lg bg-surface-800 light:bg-surface-100 text-surface-300 light:text-surface-600 hover:bg-surface-700 light:hover:bg-surface-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="emit('confirm')"
              class="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
