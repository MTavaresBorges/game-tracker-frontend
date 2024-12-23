<script setup>
    import { ref } from 'vue';
    import SearchInput from '@/components/inputs/Search.vue';
    
    const API_KEY = 'da6b190883654c9b91f542b733dc186c';
    const search = ref('');
    const games = ref([]);

    async function fetchGames(){
        if (!search.value.trim()) return;

        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search.value}`);
        const data = await response.json();
        console.log(data);

        games.value = data.results || [];
    }
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-col justify-center rounded-md bg-blue-900 shadow-lg mt-10 text-center rounded-2xl w-[50%] h-[400px]">
            <h1 class="text-2xl font-bold text-white">Search for your games!!!</h1>
            <p class="text-white">Just type the game name that you'd like to add</p>
            <SearchInput class="mt-4 w-1/2 mx-auto" v-model="search" @input="fetchGames" />

            <div class="mt-4">
                <ul>
                    <li v-for="game in games" :key="game.id">
                        {{ game.id }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>