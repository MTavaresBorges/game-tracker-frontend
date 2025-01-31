<script setup>
    import 'primeicons/primeicons.css';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';

    const isOpen = ref(false);

    const userId = ref('');

    function toggleSidebar() {
        isOpen.value = !isOpen.value;
    }

    async function fetchUserId() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            userId.value = response.data.id;
            console.log(userId.value);
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(async () => {
        await fetchUserId();
    })
</script>


<template>
    <div class="relative">
        <i class="pi pi-bars text-xl cursor-pointer" @click="toggleSidebar"></i>
        <!-- Sidebar content below -->
        <div 
            v-if="isOpen" 
            class="absolute bg-gray-200 left-0 top-12 w-64 rounded-md shadow-md overflow-hidden transition-all duration-300"
            :class="isOpen ? 'max-h-[300px] max-w-[150px] opacity-100' : 'max-h-0 opacity-0'"
            >
            <ul class="p-4">
                <li class="text-gray-700 hover:text-blue-900">
                    <RouterLink class="p-1 hover:bg-blue-200 rounded-xl cursor-pointer transition duration-300 flex" :to="{ name: 'games' }" @click="isOpen = false">
                        Find Games
                    </RouterLink>
                    <RouterLink class="p-1 hover:bg-blue-200 rounded-xl cursor-pointer transition duration-300 flex" :to="{ name: 'libraries' }" @click="isOpen = false">
                        My Libraries
                    </RouterLink>
                    <RouterLink class="p-1 hover:bg-blue-200 rounded-xl cursor-pointer transition duration-300 flex" :to="{ name: 'profile', params: { id: userId } }" @click="isOpen = false">
                        Profile
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
  </template>
  

