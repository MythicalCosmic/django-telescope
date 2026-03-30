<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </MainLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
