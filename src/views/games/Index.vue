<script setup>
    import { ref, onMounted } from 'vue';
    import { notify } from '@kyvg/vue3-notification';
    import axios from 'axios';
    import SearchInput from '@/components/inputs/Search.vue';
    import BeatenModal from '@/components/modals/games/AddBeatenGameModal.vue';
    import ListModal from '@/components/modals/games/AddGameToListModal.vue';
    import DateInput from '@/components/inputs/Birthdate.vue';
    import SelectInput from '@/components/inputs/libraries/SelectLibrary.vue';
    
    import 'primeicons/primeicons.css';
    
    const API_KEY = 'da6b190883654c9b91f542b733dc186c';
    const search = ref('');
    const games = ref([]);
    const selectedGame = ref('');
    const date = ref('');
    const status = ref([
        { id: 1, name: 'To Play' },
        { id: 2, name: 'Frozen' },
        { id: 3, name: 'Playing' },
        { id: 4, name: 'Beaten' },
    ]);
    const selectedStatus = ref('');
    const selectedLibrary = ref('');
    const libraries = ref([]);
    const isModalVisible = ref(false);
    const isListModalVisible = ref(false);

    function openModal() {
        isModalVisible.value = true;
    }

    function closeModal() {
        isModalVisible.value = false;
    }

    function openListModal() {
        isListModalVisible.value = true;
    }

    function closeListModal() {
        isListModalVisible.value = false;
    }

    async function fetchGames(){
        if (!search.value.trim()) return;

        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search.value}`);
        const data = await response.json();

        games.value = data.results || [];
    }

    const fetchLibraries = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/libraries',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            libraries.value = response.data;
        } catch (error) {
            console.error("Erro ao carregar as bibliotecas:", error);
        }
    };

    onMounted(async () => {
        await fetchLibraries();
        console.log('Libraries: ', libraries.value);
        console.log('Status: ', status.value);
    });

    async function selectGame (game) { //Just to fetch the game description.
        const response = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`);
        const gameDetails = await response.json();
        selectedGame.value = { ...game, description: gameDetails.description_raw, developers: gameDetails.developers, publishers: gameDetails.publishers };
        search.value = ''; //Just to make the search results dissapear.
    }

    async function handleCreateLibrary(isMain) {
        const isCreated = await addGame(isMain);
        if (isCreated != false) {
            closeListModal();
        }
    }

    async function addGame(isMain) {
        // console.log('Data: ', selectedStatus.value);

        const libraryId = ref(0);

        if(isMain === 1){
            selectedStatus.value = 'beaten';
        }else{
            if(!selectedLibrary.value || !selectedStatus.value){
                notify({
                    title: 'Please fill all fields',
                    type: 'error',
                });

                return false;
            }else{
                libraryId.value = selectedLibrary.value.id;
                selectedStatus.value = selectedStatus.value.name;
            }
        }

        console.log(selectedStatus.value);

        const data = {
            game: {
                name: selectedGame.value.name,
                release_date: selectedGame.value.released,
                score: selectedGame.value.rating,
                age_rating: selectedGame.value.esrb_rating ? selectedGame.value.esrb_rating.name : 'None',
                description: selectedGame.value.description,
            },
            images: [
                {
                    url: selectedGame.value.background_image,
                    order: 1,
                },
            ],
            genres: selectedGame.value.genres.map((genre) => ({
                name: genre.name,
            })),
            platforms: selectedGame.value.platforms.map((platform) => ({
                name: platform.platform.name,
            })),
            companies: [
                ...selectedGame.value.developers.map((developer) => ({
                    name: developer.name,
                    type: 'Developer',
                })),
                ...selectedGame.value.publishers.map((publisher) => ({
                    name: publisher.name,
                    type: 'Publisher',
                }))
            ],
            pivot: {
                isMain: isMain,
                status: selectedStatus.value,
                beaten_at: date.value,
                library_id: libraryId.value,
            },
        };

        const response = await axios.post('http://127.0.0.1:8000/api/games', data,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        notify({
            title: 'The game has been added!',
            text: isMain === 1 ? 'Has been added to Beaten Games list.' : 'Has been added to your list.',
            type: 'success',
        });

        console.log("Game Added: ", response.data);
    }
    
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-col justify-center rounded-xl bg-gray-800 shadow-lg p-4 mt-10 text-center rounded-2xl shadow-2xl w-[900px] h-auto">
            <h1 class="text-2xl font-bold text-white">Search for your games!!!</h1>
            <p class="text-white">Just type the game name that you'd like to add</p>
            <SearchInput class="mt-4 w-1/2 mx-auto" v-model="search" @input="fetchGames" />
            <div v-if="games.length && search" class="mx-auto mt-4 overflow-y-auto h-32 w-3/4 bg-white rounded-lg p-2">
                <ul>
                    <li v-for="game in games" :key="game.id" class="text-black">
                        <button 
                            class="w-full text-left px-2 py-1 hover:bg-blue-300 rounded-lg"
                            @click="selectGame(game)"
                        >
                            {{ game.name }}
                        </button>
                    </li>
                </ul>
            </div>
            <img :src="selectedGame.background_image" :alt="selectedGame.name" class="m-10 rounded-lg">
            <div v-if="selectedGame" class="flex">
                <div class="ml-4 text-left">
                    <div class="flex grid grid-cols-12">
                    <div class="col-span-6">
                        <p class="text-white text-lg font-bold">Name: <span class="text-white font-normal">{{ selectedGame.name }}</span></p>
                        <p class="text-white text-lg font-bold">Developer: <span class="text-white font-normal">{{ selectedGame.developers.map((developer) => developer.name).join(', ') }}</span></p>
                        <p class="text-white text-lg font-bold">Publisher: <span class="text-white font-normal">{{ selectedGame.publishers.map((publisher) => publisher.name).join(', ') }}</span></p>
                        <p class="text-white text-lg font-bold">Released: <span class="text-white font-normal">{{ selectedGame.released }}</span></p>
                        <p class="text-white text-lg font-bold">{{ selectedGame.metacritc != null ? 'Metacritic: ' : 'Score : ' }} <span class="text-white font-normal">{{ selectedGame.metacritic ? selectedGame.metacritic : selectedGame.rating }}</span></p>
                        <p class="text-white text-lg font-bold">ESRB Rating: <span class="text-white font-normal">{{ selectedGame.esrb_rating ? selectedGame.esrb_rating.name : 'None' }}</span></p>
                        <p class="text-white text-lg font-bold">Platform: <span class="text-white font-normal">{{ selectedGame.parent_platforms.map((platform) => platform.platform.name).join(', ') }}</span></p>
                        <p class="text-white text-lg font-bold">Genre: <span class="text-white font-normal">{{ selectedGame.genres.map((genre) => genre.name).join(', ') }}</span></p>
                    </div>
                    <div class="col-span-3 flex h-16 align-items justify-center">
                        <button @click="openListModal" class="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition duration-300 text-white">
                            <i class="pi pi-plus text-lg cursor-pointer mr-2"></i>
                            Add game to a list
                        </button>
                    </div>

                    <div class="col-span-3 flex h-16 align-items justify-center">
                        <button @click="openModal"  class="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition duration-300 text-white">
                            <i class="pi pi-check text-lg cursor-pointer mr-2"></i>
                            Mark as Beaten
                        </button>
                    </div>

                    </div>
                    <p class="text-white text-lg font-bold mt-4">Description: <span class="text-white font-normal">{{ selectedGame.description ? selectedGame.description : 'None' }}</span></p>
                </div>
            </div>
        </div>
        <BeatenModal :modalActive="isModalVisible" @close-modal="closeModal">
            <template #default>
                <DateInput v-model="date" label="Choose a date: " class="mt-8"/>
                <button class="bg-gray-700 rounded-xl hover:bg-green-800 transition duration-300 text-white py-2 px-4 rounded mt-4" @click="addGame(1); closeModal()">
                    Add
                </button>
            </template>
        </BeatenModal>
        <ListModal :modalActive="isListModalVisible" @close-list-modal="closeListModal">
            <template #default>
                <DateInput v-model="date" label="Choose a date: " class="mt-8"/>
                <div class="grid grid-cols-12 gap-4">
                    <SelectInput v-model="selectedLibrary" :options="libraries" label="Choose a library: " class="mt-8"/>
                    <SelectInput v-model="selectedStatus" :options="status" label="Choose a status: " class="mt-8" />
                </div>
                <button class="bg-gray-700 rounded-xl hover:bg-green-800 transition duration-300 text-white py-2 px-4 rounded mt-4" @click="handleCreateLibrary(0);">
                    Add
                </button>
            </template>
        </ListModal>
    </div>
</template>