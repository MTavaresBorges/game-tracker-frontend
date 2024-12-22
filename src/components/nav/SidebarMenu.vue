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
            class="absolute left-0 top-12 w-64 bg-gray-100 border border-gray-300 rounded-md shadow-md overflow-hidden transition-all duration-300"
            :class="isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
            >
            <ul class="p-4">
                <li class="py-2 text-gray-700 hover:text-gray-900">
                    <RouterLink :to="{ name: 'games' }" @click="isOpen = false">Find Games</RouterLink>
                </li>
            </ul>
        </div>
    </div>
  </template>
  

