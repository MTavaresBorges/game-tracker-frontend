<script setup>

  import { ref } from 'vue';
  
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <nav class="flex items-center justify-between p-4">

      <div class="flex-1">
        <div>

        </div>
      </div>

      <RouterLink :to="{ name: 'home' }">
        <div class="text-lg font-bold flex-1 text-center">
          Game Tracker
        </div>
      </RouterLink>

      <div class="flex-1 flex justify-end gap-4">
        <RouterLink :to="{ name: 'signin' }">
          <button class="px-4 py-2 bg-blue-700 rounded-xl hover:bg-blue-800">Sign In</button>
        </RouterLink>

        <RouterLink :to="{ name: 'signup' }">
          <button class="px-4 py-2 bg-blue-700 rounded-xl hover:bg-blue-800">Sign Up</button>
        </RouterLink>
      </div>

    </nav>
  </header>
</template>

