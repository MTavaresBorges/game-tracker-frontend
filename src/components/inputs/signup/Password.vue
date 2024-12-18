<script setup>
import { ref } from 'vue';

const password = ref('');
</script>

<template>
    <div class="col-span-6 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Password</label>
        <input v-model="password" type="password" placeholder="Type your password" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>