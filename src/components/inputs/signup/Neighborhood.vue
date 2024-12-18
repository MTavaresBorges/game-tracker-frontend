<script setup>
import { ref } from 'vue';

const neighborhood = ref('');
</script>

<template>
    <div class="col-span-10 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Neighborhood</label>
        <input v-model="neighborhood" type="text" placeholder="Type your neighborhood" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>