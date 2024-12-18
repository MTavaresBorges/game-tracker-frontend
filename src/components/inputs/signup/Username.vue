<script setup>
import { ref } from 'vue';

const username = ref('');
</script>

<template>
    <div class="col-span-6 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Username</label>
        <input v-model="username" type="text" placeholder="Type your username" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>