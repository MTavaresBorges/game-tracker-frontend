<script>
    import 'primeicons/primeicons.css';
    export default {
        name: "Sidebar",
        data() {
            return {
            isOpen: false,
            };
        },
        methods: {
            toggleSidebar() {
                this.isOpen = !this.isOpen;
            },
        },
    };
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
                <li class="p-2 text-gray-700 hover:text-blue-900 hover:bg-blue-200 rounded-xl cursor-pointer transition duration-300">
                    <RouterLink :to="{ name: 'games' }" @click="isOpen = false">Find Games</RouterLink>
                </li>
            </ul>
        </div>
    </div>
  </template>
  

