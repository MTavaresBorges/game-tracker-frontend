<script setup>
  import { RouterView } from 'vue-router';
  import NavigationMenu from '@/components/nav/NavigationMenu.vue';
</script>

<template>
  <div>
    <NavigationMenu />
    <RouterView />
    <notifications />
  </div>
</template>

<style scoped>

</style>
