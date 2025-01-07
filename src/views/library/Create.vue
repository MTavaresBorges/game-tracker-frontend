<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import NameInput from '@/components/inputs/libraries/Name.vue';
    import DescriptionInput from '@/components/inputs/libraries/Description.vue';

    const name = ref('');

</script>

<template>
    <main class="text-center container mx-auto text-white">
        <div class="rounded-xl mt-10 w-[40%] mx-auto">
            <div class="p-6 font-bold text-2xl font-roboto">
                Create your library
            </div>
        </div>
        <form @submit.prevent="submitForm" class="bg-gray-800 grid grid-cols-12 gap-4 items-center rounded-xl shadow-lg mt-10 w-[40%] mx-auto p-6">
            <div class="col-span-12 text-center">
                <NameInput v-model="name"/>
                <DescriptionInput v-model="description" />
                <!-- <button type="submit" class="mt-6 w-full transition duration-300 bg-gray-700 rounded-xl shadow-lg w-[30%] mx-auto p-6 font-bold text-2xl font-roboto bg-gray-700 hover:bg-gray-600">
                    Create
                </button> -->
            </div>
        </form>
    </main>
</template>