<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { notify } from '@kyvg/vue3-notification';
    import 'primeicons/primeicons.css';
    import NameInput from '@/components/inputs/libraries/Name.vue';
    import DescriptionInput from '@/components/inputs/libraries/Description.vue';
    import ImageInput from '@/components/inputs/libraries/Image.vue';
    import GameInfoModal from '@/components/modals/GameInfoModal.vue';
    import DisattachModal from '@/components/modals/DisattachGameModal.vue';
    import axios from 'axios';

    const library = ref({
        games: [],
    });
    const name = ref('');
    const description = ref('');
    const file = ref(null);

    const isGameInfoModalVisible = ref(false);
    const isDisattachModalVisable = ref(false);
    const selectedDescription = ref('');
    const toBeDeletedGameId = ref('');

    const openGameInfoModal = (description) => {
        selectedDescription.value = description; 
        isGameInfoModalVisible.value = true;
    };

    const closeGameInfoModal = () => {
        isGameInfoModalVisible.value = false;
        selectedDescription.value = '';
    };

    const openDisattachModal = (id) => {
        toBeDeletedGameId.value = id;
        isDisattachModalVisable.value = true;
    }

    const closeDisattachModal = () => {
        isDisattachModalVisable.value = false;
        toBeDeletedGameId.value = '';
    };

    const route = useRoute();
    const id = route.params.id;

    onMounted(async () => {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/libraries/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            library.value = response.data;
            name.value = library.value.name;
            description.value = library.value.description;
            // console.log(library);
        }catch(error){
            console.error(error);
        }
    });

    function formatDate(date) {
        if (!date) return '';
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString('en-US');
    }

    async function updateLibrary() {
        //TODO: Fix this, images must be stored in the database.
        // const formData = new FormData();
        // formData.append('name', name.value);
        // formData.append('description', description.value);

        const data = {
            name: name.value,
            description: description.value,
        };

        // if (file.value) {
        //     formData.append('file', file.value);
        // }

        if (!name.value || !description.value) {
            notify({
                title: 'Please fill out all fields',
                type: 'error',
            });
            return;
        }
        
        try {
            await axios.put(`http://127.0.0.1:8000/api/libraries/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            notify({
                title: 'Library updated successfully',
                type: 'success',
            });

            
            library.value = data;
        } catch (error) {
            console.error(error);
        }
    }

    async function removeGame(id){
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/games/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            notify({
                title: 'Game deleted successfully',
                type: 'success',
            });

            library.value.games = library.value.games.filter(game => game.id !== id); //TODO: Use an axios function instead of this.
            console.log(response.data);
        }catch(error){
            console.error(error);
        }
    }
</script>

<template>
    <h1 class="p-6 text-2xl font-bold text-white text-center">{{ library.name }} Library</h1>
    <div class="flex justify-center text-center text-white grid grid-cols-12">
        <div class="p-6 bg-gray-800 rounded-xl shadow-lg mt-10 w-[500px] mx-auto col-span-12">
            <form @submit.prevent="updateLibrary">
                <NameInput v-model="name"/>
                <DescriptionInput v-model="description" />
                <ImageInput v-model="file"/>
                <button type="submit" class="w-[200px] bg-gray-700 rounded-xl hover:bg-gray-600 transition duration-300 text-white mt-8 py-2 px-6">
                    Update Library
                </button>
            </form>
        </div>
        <div class="col-span-12 mx-auto">
            <RouterLink :to="{ name: 'games' }">
                <button class="w-[200px] bg-gray-800 rounded-xl hover:bg-gray-600 transition duration-300 text-white mt-16 py-2 px-6">
                    Add More Games
                </button>
            </RouterLink>
        </div>
        <div class="p-4 bg-gray-800 rounded-xl shadow-lg mt-10 w-[900px] mx-auto col-span-12 text-left">
            <table class="w-full rounded-xl">
                <thead>
                    <tr>
                        <th class="p-2">Name</th>
                        <th class="p-2">Release Date</th>
                        <th class="p-2">Age Rating</th>
                        <th class="p-2">Added At</th>
                        <th class="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody class="border-t border-gray-200 dark:border-gray-700">
                    <tr v-for="game in library.games" :key="game.id">
                        <td class="p-2">{{ game.name }}</td>
                        <td class="p-2">{{ formatDate(game.release_date) }}</td>
                        <td class="p-2">{{ game.age_rating }}</td>
                        <td class="p-2">{{ formatDate(game.created_at) }}</td>
                        <td class="p-2">
                            <button @click="openGameInfoModal(game.description)" class="px-4 py-2 mr-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition duration-300">
                                <i class="pi pi-info-circle text-xl cursor-pointer"></i>
                            </button>
                            <button @click="openDisattachModal(game.id)" class="px-4 py-2 bg-gray-700 rounded-xl hover:bg-red-800 transition duration-300">
                                <i class="pi pi-trash text-xl cursor-pointer"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <GameInfoModal :modalActive="isGameInfoModalVisible" @close="closeGameInfoModal">
            <template #default>
                <h2 class="px-6 text-lg col-span-12">{{ selectedDescription }}</h2>
            </template>
        </GameInfoModal>
        <DisattachModal :modalActive="isDisattachModalVisable" @close-modal="closeDisattachModal">
            <template #default>
                <button class="mr-1 col-span-6 bg-gray-700 rounded-xl hover:bg-red-800 transition duration-300 text-white mt-8 py-2 px-6" @click="removeGame(toBeDeletedGameId); closeDisattachModal()">
                    Delete
                </button>
            </template>
        </DisattachModal>
    </div>
</template>