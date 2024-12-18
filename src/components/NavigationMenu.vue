<script setup>

  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';

  const isDropdownOpen = ref(false); //Dropdown state

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
  
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <nav class="flex items-center justify-between p-4">

      <div class="flex-1">
        <div>
          <button 
            @click="toggleDropdown" 
            type="button" 
            class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            Tracker
          </button>
          <div v-if="isDropdownOpen" class=" w-48 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">List</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Feed</a>
            </div>
          </div>
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

