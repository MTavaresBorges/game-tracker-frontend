<script setup>
import { ref } from 'vue';

const fullname = ref('');
</script>

<template>
    <div class="col-span-12 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Fullname</label>
        <input v-model="fullname" type="text" placeholder="Type your entire name" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>