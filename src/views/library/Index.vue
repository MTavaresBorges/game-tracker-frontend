<script setup>
    import { onMounted, ref } from 'vue';
    import { notify } from '@kyvg/vue3-notification';
    import CreateModal from '@/components/modals/LibraryModal.vue';
    import NameInput from '@/components/inputs/libraries/Name.vue';
    import DescriptionInput from '@/components/inputs/libraries/Description.vue';
    import ImageInput from '@/components/inputs/libraries/Image.vue';
    import axios from 'axios';
    
    const isModalVisible = ref(false);

    function openModal() {
        isModalVisible.value = true;
    }

    function closeModal() {
        isModalVisible.value = false;
    }

    const name = ref('');
    const description = ref('');
    const file = ref(null);
    const libraries = ref([]);

    onMounted(async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/libraries', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            libraries.value = response.data;
        }catch(error){
            console.error(error);
        }
    });

    function formatDate(date) {
        if (!date) return '';
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString('en-US');
    }

    async function createLibrary() {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('description', description.value);
        if (file.value) {
            formData.append('file', file.value);
        }
        formData.append('visibility', 'public');

        try{ // Create the library
            await axios.post('http://127.0.0.1:8000/api/libraries', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            notify({
                title: 'Library created successfully',
                type: 'success',
            });
        
        // Refresh the list of libraries
        const response = await axios.get('http://127.0.0.1:8000/api/libraries', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            libraries.value = response.data;
            console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }

    async function deleteLibrary(library) {
        try{ // Delete the library
            const response = await axios.delete(`http://127.0.0.1:8000/api/libraries/${library.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            notify({
                title: 'Library deleted successfully',
                type: 'success',
            });

            // Refresh the list of libraries
            libraries.value = libraries.value.filter(item => item.id !== library.id);
            console.log(response.data);
        }catch(error){
            console.error(error);
        }
    }

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="p-10 text-2xl font-bold text-white">Your Libraries</h1>
        <button @click="openModal" class="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition duration-300 text-white">Add New Library</button>
        <hr class="w-1/2 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
        <div @click="goto" v-for="library in libraries" class="grid grid-cols-12 gap-4 mb-6 bg-gray-800 text-white shadow-xl w-[850px] p-4 rounded-lg cursor-pointer transform transition duration-300 hover:scale-105">
            <div class="col-span-4">
                <img src="https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg" class="h-full" alt="">
            </div>
            <div class="col-span-8">
                <h2 class="text-lg font-bold">{{ library.name }} </h2>
                <p class="line-clamp-2">{{ library.description }}</p>
                <div class="grid grid-cols-2 mt-4">
                    <p>Amount of games: {{ library.games.length }}</p>
                    <p>Date Created: {{ formatDate(library.created_at) }}</p>
                </div>
                <div class="grid grid-cols-12 gap-2 mt-4">
                    <p class="text-green-500 mt-2 col-span-4 font-bold">Public</p>
                    <button class="col-span-4 px-4 py-2 bg-gray-700 rounded-xl hover:bg-blue-800 transition duration-300">View</button>
                    <button @click="deleteLibrary(library)" class="col-span-4 px-4 py-2 bg-gray-700 rounded-xl hover:bg-red-800 transition duration-300">Delete</button>
                </div>
            </div>
        </div>
        <CreateModal :modalActive="isModalVisible" @close-modal="closeModal">
            <template #default>
                <NameInput v-model="name"/>
                <DescriptionInput v-model="description" />
                <ImageInput v-model="file"/>
                <button class="mr-1 col-span-6 bg-gray-800 rounded-xl hover:bg-gray-600 transition duration-300 text-white mt-8 py-2 px-6" @click="createLibrary(); closeModal()">
                    Add
                </button>
            </template>
        </CreateModal>
    </div>
</template>