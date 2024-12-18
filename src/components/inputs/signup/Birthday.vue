<script setup>
import { ref } from 'vue';

const birthday = ref('');
</script>

<template>
    <div class="col-span-4 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Birthday</label>
        <input v-model="birthday" type="date" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>