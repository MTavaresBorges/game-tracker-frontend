<script setup>
  import { RouterView } from 'vue-router';
  import NavigationMenu from '@/components/NavigationMenu.vue';
</script>

<template>
  <div>
    <NavigationMenu />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
