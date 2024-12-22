<script setup>
  import { isAuthenticated, setAuthenticated } from '../../utils/auth';
  import Sidebar from "@/components/nav/SidebarMenu.vue";
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const router = useRouter();

  const logout = async () => {
    try {
    await axios.post('http://127.0.0.1:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      },
    });
      localStorage.removeItem('token');
      setAuthenticated(false);
      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
  };

</script>

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <nav class="flex items-center justify-between p-4">
      <div class="flex-1">
        <template v-if="isAuthenticated">
          <div>
            <Sidebar />
          </div>
        </template>
      </div>

      <RouterLink :to="{ name: 'home' }">
        <div class="text-lg font-bold flex-1 text-center">
          Game Tracker
        </div>
      </RouterLink>

      <template v-if="!isAuthenticated">
        <div class="flex-1 flex justify-end gap-4">
          <RouterLink :to="{ name: 'signin' }">
            <button class="px-4 py-2 bg-blue-700 rounded-xl hover:bg-blue-800">Sign In</button>
          </RouterLink>

          <RouterLink :to="{ name: 'signup' }">
            <button class="px-4 py-2 bg-blue-700 rounded-xl hover:bg-blue-800">Sign Up</button>
          </RouterLink>
        </div>
      </template>

      <template v-else>
        <div class="flex-1 flex justify-end gap-4">
          <button @click="logout" class="px-4 py-2 bg-blue-700 rounded-xl hover:bg-blue-800">Logout</button>
        </div>
      </template>

    </nav>
  </header>
</template>

