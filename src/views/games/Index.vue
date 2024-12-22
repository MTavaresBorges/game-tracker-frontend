<script setup>
    import SearchInput from '@/components/inputs/Search.vue';
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-col justify-center rounded-md bg-blue-900 shadow-lg mt-10 text-center rounded-2xl w-[50%] h-[400px]">
            <h1 class="text-2xl font-bold text-white">Search for your games!!!</h1>
            <p class="text-white">Just type the game name that you'd like to add</p>
            <SearchInput class="mt-4 w-1/2 mx-auto" v-model="search" />
        </div>
    </div>
</template>